"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useVoting } from "@/lib/store";

const userSchema = z.object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    cmsId: z.string().min(5, "Invalid CMS ID"),
    batch: z.string().min(2, "Batch is required (e.g., 2022)"),
    department: z.string().min(2, "Department is required"),
    email: z.string().email().refine((val) => {
        const lower = val.toLowerCase();
        // Allow ONLY @student.nust.edu.pk or @nust.edu.pk
        // Explicitly BLOCK @seecs.edu.pk or other subdomains if not student.nust
        const isStudent = lower.endsWith("@student.nust.edu.pk");
        const isOfficial = lower.endsWith("@nust.edu.pk");
        const isDepartmental = lower.endsWith("@seecs.edu.pk") || (lower.split('@')[1] !== "nust.edu.pk" && lower.split('@')[1] !== "student.nust.edu.pk");

        // Logic:
        // Must end with student.nust.edu.pk OR nust.edu.pk
        // AND must NOT fail the specific exclusions for departmental emails if they are considered invalid
        // The user said: "Validation rules to enforce: Email must end with: @student.nust.edu.pk, @nust.edu.pk, @seecs.edu.pk"
        // BUT ALSO said: "Do NOT: Accept department-based emails like @seecs.edu.pk"

        // Strict Interpretation:
        // Pass if: ends with "@student.nust.edu.pk" OR "@nust.edu.pk"
        // Fail if: ends with "@seecs.edu.pk" (even if it matches nust.edu.pk technically, though it doesn't match the exact strings above)

        // Wait, "seecs.edu.pk" does NOT end with "nust.edu.pk".

        return isStudent || (isOfficial && !val.includes("@seecs.edu.pk"));
    }, {
        message: "Please use your official NUST student email (...@student.nust.edu.pk)",
    }),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
    const { setUser } = useVoting();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserFormData) => {
        setUser(data);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass-card rounded-2xl p-8 space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold text-white">Student Verification</h2>
                    <p className="text-steel text-sm">Verify your identity to unlock the voting module.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-mist">Full Name</Label>
                        <input
                            id="fullName"
                            placeholder="Ali Nawaz"
                            className="glass-input w-full px-4 py-2"
                            {...register("fullName")}
                        />
                        {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cmsId" className="text-mist">CMS ID</Label>
                        <input
                            id="cmsId"
                            placeholder="335678"
                            className="glass-input w-full px-4 py-2"
                            {...register("cmsId")}
                        />
                        {errors.cmsId && <p className="text-red-400 text-xs">{errors.cmsId.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="batch" className="text-mist">Batch</Label>
                            <input
                                id="batch"
                                placeholder="2022"
                                className="glass-input w-full px-4 py-2"
                                {...register("batch")}
                            />
                            {errors.batch && <p className="text-red-400 text-xs">{errors.batch.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-mist">Department</Label>
                            <input
                                id="department"
                                placeholder="SEECS"
                                className="glass-input w-full px-4 py-2"
                                {...register("department")}
                            />
                            {errors.department && <p className="text-red-400 text-xs">{errors.department.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-mist">NUST Email</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.name@student.nust.edu.pk"
                            className="glass-input w-full px-4 py-2"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                        <p className="text-xs text-steel/50">Must be an official @student.nust.edu.pk or @nust.edu.pk address.</p>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary-glow text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/20">
                        Verify & Continue
                    </Button>
                </form>
            </div>
        </div>
    );
}
