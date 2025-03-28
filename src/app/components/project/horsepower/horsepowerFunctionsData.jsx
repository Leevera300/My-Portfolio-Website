export const functions = [
    {
        title: {
          en: "Login & Signup Function",
          ko: "로그인 & 회원가입 기능"
        },
        description: {
          en: "Handles user registration, login, and session security",
          ko: "회원가입, 로그인, 세션 보안을 처리합니다"
        },
        image: "/images/horsepower/horsepower-login.webp",
        availability: true,
        details: {
          en: "Users can register with email and password. The system checks for existing emails before allowing sign-up, and passwords are securely hashed using PBKDF2. For login, the input password is compared with the stored hash to authenticate users.",
          ko: "사용자는 이메일과 비밀번호로 회원가입할 수 있습니다. 회원가입 시 이메일 중복을 확인하고, 비밀번호는 PBKDF2를 사용해 안전하게 해시 처리됩니다. 로그인 시 입력한 비밀번호를 해시값과 비교하여 인증합니다."
        },
        media: {
          signup: {
            image: "/images/horsepower/horsepower-login-3.png",
            video: "/images/horsepower/horsepower-login-vid1.mp4"
          },
          login: {
            image: "/images/horsepower/horsepower-login-2.png",
            video: "/images/horsepower/horsepower-login-vid2.mp4"
          },
          googleLogin: {
            image: "/images/horsepower/horsepower-login-1.png"
          }
        },
        documentation: {
          en: `
      Sign-Up

      📽️ [Signup Demo (Video)]({media.signup.video})
      
      - Checks if email already exists in the database before allowing sign-up.
      - Passwords are hashed using PBKDF2.
      - Even the same password results in a different hash each time for added security.
      
      ![Signup Code]({media.signup.image})
      
      
      
      ---
      
      Login

        📽️ [Login Demo (Video)]({media.login.video})
      
      - Password input is compared against the server-side hashed version using PBKDF2.
      - Login is granted only if the match is valid.
      
      ![Login Code]({media.login.image})
      
      ---
      
      ### Google Login (Attempted)
      
      - Tried implementing Google login through Spring Security, but ran into unexpected import issues.
      - As a workaround, used a direct \`<a>\` tag to initiate login.
      - Login succeeded, but fetching user data after login failed due to security configuration issues.
      
      ![Google Login Code]({media.googleLogin.image})
          `,
          ko: `
      ### 회원가입

        📽️ [회원가입 데모 영상]({media.signup.video})
      
      - 이메일 중복 여부를 확인한 후에 회원가입이 가능합니다.
      - 비밀번호는 PBKDF2로 해시 처리됩니다.
      - 같은 비밀번호여도 해시 결과가 매번 달라 추측이 어렵습니다.
      
      ![회원가입 코드]({media.signup.image})
      
      ---
      
      ### 로그인

        📽️ [로그인 데모 영상]({media.login.video})
      
      - 입력한 비밀번호와 서버에 저장된 해시값을 PBKDF2로 비교합니다.
      - 일치할 경우에만 로그인이 됩니다.
      
      ![로그인 코드]({media.login.image})
    
      ---
      
      ### 구글 로그인 (시도)
      
      - Spring Security로 구글 로그인을 구현하려 했지만, 설정 중 import 오류가 발생했습니다.
      - 우회 방법으로 \`<a>\` 태그를 사용해 로그인을 시도했습니다.
      - 로그인은 성공했지만, 사용자 정보를 가져오는 데는 실패했습니다.
      
      ![구글 로그인 코드]({media.googleLogin.image})
          `
        }
    },
    {
        title: {
          en: "Authentication Function",
          ko: "인증 기능"
        },
        description: {
          en: "Handles user authentication and session management",
          ko: "사용자 인증 및 세션 관리를 처리합니다"
        },
        image: "/images/auth-function.png",
        availability: true,
        details: {
          en: "This function provides secure authentication using JWT tokens and includes features like password hashing, session management, and refresh tokens.",
          ko: "이 기능은 JWT 토큰을 사용하여 안전한 인증을 제공하며 비밀번호 해싱, 세션 관리, 리프레시 토큰 등의 기능을 포함합니다."
        },
        documentation: {
          en: `
            ## Usage
            \`\`\`javascript
            await authenticate(username, password);
            \`\`\`
            
            ## Parameters
            - username: string
            - password: string
            
            ## Returns
            - JWT token and user information
          `,
          ko: `
            ## 사용법
            \`\`\`javascript
            await authenticate(username, password);
            \`\`\`
            
            ## 매개변수
            - username: 문자열
            - password: 문자열
            
            ## 반환값
            - JWT 토큰 및 사용자 정보
          `
        }
    }
    // Add more functions as needed
];