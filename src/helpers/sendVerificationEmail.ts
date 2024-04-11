import { resend } from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse>{
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery message | Verification Code',
            react: VerificationEmail({username,otp: verifyCode}),
        });
        return {
            success: true,
            message: "Verification Email send successfully"
        }
    } catch (emailError) {
        console.error('Error Sending verification email',emailError);
        return {
            success: false,
            message: "Failed to send Verification Email"
        }
    }
}