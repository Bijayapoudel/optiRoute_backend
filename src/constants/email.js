export const EMAIL = {
    USER_ACTIVATION: {
      ACTIVATION_LINK_URL: `${process.env.APP_URL}/api/v1/user`,
      EMAIL_ACTIVATION_SUBJECT: 'Activate Your Account',
      EMAIL_TEMPLATE_NAME: 'email-sending',
      ACTIVATION_LINK_SECRET_KEY: 'iamgoingtobeaveryverygoodpersonintheworld',
    },
    RESET_PASSWORD: {
      RESET_PASSWORD_SUBJECT: 'Click to reset your password',
      RESET_PASSWORD_TOKEN_URL: `${process.env.APP_URL}/api/v1/user/reset-password`,
      FORGOT_PASSWORD_TEMPLATE: 'forgot-password',
    },
  }
  