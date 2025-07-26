import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const suggestion = formData.get('suggestion') as string;
    const isAnonymous = formData.get('anonymous') === 'on';

    // 이메일 검증
    const emailRegex = /^[^\s@]+@connect\.ust\.hk$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please use your HKUST email address (@connect.ust.hk)'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!suggestion.trim()) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please enter your suggestion'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 이메일 전송 설정 (Gmail SMTP 사용)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // 환경변수에서 Gmail 계정
        pass: process.env.GMAIL_APP_PASSWORD // 환경변수에서 앱 비밀번호
      }
    });

    // 이메일 내용 구성
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'jyangca@connect.ust.hk', // 관리자 이메일
      subject: '[KSA 신문고] 새로운 건의사항이 제출되었습니다',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
            HKUST KSA 신문고 - 새로운 건의사항
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">제출 정보</h3>
            <p><strong>제출자 이메일:</strong> ${isAnonymous ? '익명' : email}</p>
            <p><strong>제출 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
            <p><strong>익명 제출:</strong> ${isAnonymous ? '예' : '아니오'}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">건의사항 내용</h3>
            <div style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">
              ${suggestion}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>참고:</strong> 이 건의사항에 대한 답변은 1주일 내에 KSA Facebook 그룹을 통해 공지됩니다.
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>이 이메일은 HKUST KSA 웹사이트 신문고 시스템에서 자동으로 발송되었습니다.</p>
          </div>
        </div>
      `
    };

    // 이메일 발송
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your suggestion! We will review it and respond within a week.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      message: 'An error occurred while sending your suggestion. Please try again later.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 