"use server";

import { User, VoteEntry } from "@/lib/types";

interface SubmissionPayload {
    user: User;
    mainMenuVotes: VoteEntry[];
    ramadanMenuVotes: VoteEntry[];
}

export async function submitVotes(payload: SubmissionPayload) {
    const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    // 1. Env Check
    if (!SCRIPT_URL) {
        console.error("Critical: Google Script URL is missing in environment variables.");
        return { success: false, message: "Submission service is temporarily unavailable. Please try again later." };
    }

    // 2. Data Validation
    if (!payload.user || !payload.user.email) {
        return { success: false, message: "Student data is incomplete." };
    }

    // Domain Check (Strict)
    const email = payload.user.email.toLowerCase();
    const isStudent = email.endsWith("@student.nust.edu.pk");
    const isOfficial = email.endsWith("@nust.edu.pk");
    // Accept official NUST emails, strictly reject prohibited ones like pure department domains if not ending in nust.edu.pk (already covered)
    // AND explicitly reject @seecs.edu.pk as requested interactively.
    const isValid = (isStudent || isOfficial) && !email.includes("@seecs.edu.pk");

    if (!isValid) {
        return { success: false, message: "Please use your official NUST student email (...@student.nust.edu.pk)" };
    }

    // Vote Check
    if (payload.mainMenuVotes.length === 0 && payload.ramadanMenuVotes.length === 0) {
        return { success: false, message: "No votes selected. Please select at least one option." };
    }


    try {
        console.log("Submitting to Script URL:", SCRIPT_URL); // Debug log

        // Using explicit fetch options for robustness
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Explicitly verify redirect behavior for GAS
            redirect: "follow",
            body: JSON.stringify(payload),
        });

        // Check HTTP status first
        if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        // Check Logical Status from Script
        if (result.status === "success") {
            return { success: true };
        } else {
            console.error("Script Logic Error:", result.message);
            // Return logic error if safe (e.g. duplicate), otherwise generic
            // Assuming result.message is safe as per our script
            return { success: false, message: result.message || "Submission service is temporarily unavailable. Please try again later." };
        }

    } catch (error) {
        console.error("Network/Submission Critical Error:", error);
        return { success: false, message: "Submission service is temporarily unavailable. Please try again later." };
    }
}
