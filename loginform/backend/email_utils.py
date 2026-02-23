import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER   = os.getenv("EMAIL_USER")
EMAIL_PASS   = os.getenv("EMAIL_PASS")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


def send_reset_email(to_email: str, reset_token: str):
    """Send a password-reset link to the user's email."""
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Reset your TaskApp password"
    msg["From"]    = EMAIL_USER
    msg["To"]      = to_email

    html = f"""
    <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;
                background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
      <h2 style="color:#1e1e2e;margin-bottom:8px;">Reset your password</h2>
      <p style="color:#6b7280;margin-bottom:24px;">
        Click the button below to set a new password. This link expires in <strong>30 minutes</strong>.
      </p>
      <a href="{reset_link}"
         style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;
                border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        Reset Password
      </a>
      <p style="color:#9ca3af;font-size:12px;margin-top:24px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, to_email, msg.as_string())
        print(f"[email] Reset link sent to {to_email}")
    except Exception as e:
        print(f"[email] Could not send email ({e}). Reset link: {reset_link}")
