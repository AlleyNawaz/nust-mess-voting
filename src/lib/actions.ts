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
        // Returns generic error to UI
        return { success: false, message: "Submission service is temporarily unavailable. Please try again later." };
    }

    // 2. Data Validation
    if (!payload.user || !payload.user.email) {
        return { success: false, message: "Student data is incomplete." };
    }

    // Domain Check
    if (!payload.user.email.endsWith("nust.edu.pk")) {
        return { success: false, message: "Invalid Email Domain. Must be @nust.edu.pk" };
    }

    // Vote Check
    if (payload.mainMenuVotes.length === 0 && payload.ramadanMenuVotes.length === 0) {
        return { success: false, message: "No votes selected. Please select at least one option." };
    }


    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Keeping structure compatible with the deployed script
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.status === "success") {
            return { success: true };
        } else {
            console.error("Script Error:", result.message);
            // Even if script returns error (e.g. duplicate), show it IF it's user-facing safelisted, 
            // otherwise show generic. 
            // The script currently returns "You have already voted..." which is safe to show.
            return { success: false, message: result.message || "Submission service is temporarily unavailable. Please try again later." };
        }

    } catch (error) {
        console.error("Network/Submission Error:", error);
        return { success: false, message: "Submission service is temporarily unavailable. Please try again later." };
    }
}
