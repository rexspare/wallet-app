enum SCREENS {
  SPLASH = "SPALSH",
  MAIN = "MAIN",
  AUTH = "AUTH",
  ONBOARDING = "ONBOARDING",
  APP = "APP",
  LANDING = "LANDING",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGNUP_VERIFICATION = "OTP_VERIFICATION",
  HOME = "HOME",
  TOKEN_DETAIL = "TOKEN_DETAIL",
  SWAP = "SWAP",
  SWAP_CONFIRM = "SWAP_CONFIRM",
  SWAP_SUCCESS = "SWAP_SUCCESS",
  WALLET = "WALLET",
  SETTINGS = "SETTINGS",
  BOTTOM = "BOTTOM",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  PASSWORD_OTP = "PASSWORD_OTP",
  PASSWORD_UPDATE_OTP = "PASSWORD_UPDATE_OTP",
  RESET_PASSWORD = "RESET_PASSWORD",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  OTP_PASSWORD = "OTP_PASSWORD",
  DEPOSIT = "DESPOSIT",
  SEND = "SEND",
  DEPOSIT_ADDRESS = "DEPOSIT_ADDRESS",
  SEND_ADDRESS = "SEND_ADDRESS",
  SEND_DETAIL = "SEND_DETAIL",
  SEND_OTP = "SEND_OTP",
  SEND_SUCCESS = "SEND_SUCCESS",
  SUPPORT = "SUPPORT",
  FAQ = "FAQ",
  EDIT_PROFILE = "EDIT_PROFILE",
  POLICY = "POLICY",
  NOTIFICATION = "NOTIFICATION",
  PRIVATE_KEY = "PRIVATE_KEY",
  PRIVATE_KEY_OTP = "PRIVATE_KEY_OTP",
  PRIVATE_KEY_PASSWORD = "PRIVATE_KEY_PASSWORD",
  PRIVATE_KEY_SUCCESS = "PRIVATE_KEY_SUCCESS",
}

enum ASYNC_KEYS {
  TOKEN = "@TOKEN",
  USER = "@USER",
  ONBOARDING = "@ONBOARDING"
}

const BASE_URL = "https://example.com";



enum ROUTES {
  SIGNUP = "/api/v1/auth/signup/",
  VERIFY_EMAIL = "/api/v1/auth/verify-email/",
  RESEND_VERIFY_EMAIL = "/api/v1/auth/resend-otp/",
  SIGNIN = "/api/v1/auth/login/",
  USER_DATA = "/api/v1/get-user-profile-data/",
  REQUEST_RESET_PASS_OTP = "/api/v1/auth/request-reset-password-otp/",
  VERIFY_RESET_PASS_OTP = "/api/v1/auth/verify-reset-password-otp/",
  RESET_PASSWORD_AUTH = "/api/v1/auth/reset-password/",
  COIN_LIST = "/api/v1/get-coins-data/",
  USER_COIN_BALANCE = "/api/v1/user-balance/",
  GET_WALLET = "/api/v1/wallet/get/",
  CHANGE_BASE_CURRENCY = "/api/v1/settings/change-currency/",
  CONVERTED_AMOUNT = "/api/v1/swap-convert/",
  SWAP = "/api/v1/swap/",
  VERIFY_EMAIL_SETTING = "/api/v1/settings/verify-current-email/",
  UPUDATE_PASSWORD_SETTING = "/api/v1/settings/update-password/",
  TOTP_SETUP = "/api/v1/totp/setup/",
  TOTP_VERIFY = "/api/v1/totp/verify/",
  SEND = "/api/v1/send/",
  SEND_OTP = "/api/v1/withdraw/otp/",
  TRANSACTION_HISTORY = "/api/v1/transaction-history/?token=",
  PRIVATE_KEY_OTP = "/api/v1/wallet/api/send-otp/",
  PRIVATE_KEY_OTP_VERIFY = "/api/v1/wallet/verify-email/",
  PRIVATE_KEY_OTP_PASSWORD = "/api/v1/wallet/verify-password/",
  PRIVATE_KEY_GET = "/api/v1/wallet/access-private-key/",
  GET_GAS_FEE = "/api/v1/gas-price/",
  NOTIFICATION_TRANSACTIONS = "/api/v1/notifications/user_transactions/",
  NOTIFICATION_DETAILS = "/api/v1/notifications/",
}


enum ALERT_TYPES {
  SUCCESS = 'success',
  WARNING = "error",
  DANGER = "error",
  INFO = "info"
}
enum ALERT_HEADER {
  SUCCESS = 'SUCCESS!',
  WARNING = "WARNING!",
  DANGER = "ERROR!",
  INFO = "INFO"
}


export {
  SCREENS,
  ASYNC_KEYS,
  BASE_URL,
  ROUTES,
  ALERT_TYPES,
  ALERT_HEADER,
}