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
    // Explicitly reject purely departmental domains unless they are subdomains of nust.edu.pk (logic handled by endsWith)
    // But reject "seecs.edu.pk" (without nust) or other variants if any.
    // However, the rule "Do NOT accept department-based emails like @seecs.edu.pk" means specifically block that.

    // Valid: "ali@student.nust.edu.pk", "staff@nust.edu.pk"
    // Invalid: "ali@seecs.edu.pk"
    const isValid = (isStudent || isOfficial) && !email.includes("@seecs.edu.pk");

    if (!isValid) {
        return { success: false, message: "Please use your official NUST student email (...@student.nust.edu.pk)" };
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
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.status === "success") {
            return { success: true };
        } else {
            console.error("Script Error:", result.message);
            return { success: false, message: result.message || "Submission service is temporarily unavailable. Please try again later." };
        }

    } catch (error) {
        console.error("Network/Submission Error:", error);
        return { success: false, message: "Submission service is temporarily unavailable. Please try again later." };
    }
}
