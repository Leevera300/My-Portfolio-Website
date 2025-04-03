const CENTER_IMAGE = "flex justify-center";

export const functions = [
  {
    title: {
      en: "Login & Signup Function",
      ko: "로그인 & 회원가입 기능",
    },
    description: {
      en: "Handles user registration, login, and session security",
      ko: "회원가입, 로그인, 세션 보안을 처리합니다",
    },
    image: "/images/horsepower/horsepower-login.webp",
    availability: true,
    details: {
      en: "Users can register with email and password. The system checks for existing emails before allowing sign-up, and passwords are securely hashed using PBKDF2. For login, the input password is compared with the stored hash to authenticate users.",
      ko: "사용자는 이메일과 비밀번호로 회원가입할 수 있습니다. 회원가입 시 이메일 중복을 확인하고, 비밀번호는 PBKDF2를 사용해 안전하게 해시 처리됩니다. 로그인 시 입력한 비밀번호를 해시값과 비교하여 인증합니다.",
    },
    media: {
      signup: {
        image: "/images/horsepower/horsepower-login-3.png",
        video: "/images/horsepower/horsepower-login-vid1.mp4",
      },
      login: {
        image: "/images/horsepower/horsepower-login-2.png",
        video: "/images/horsepower/horsepower-login-vid2.mp4",
      },
      googleLogin: {
        image: "/images/horsepower/horsepower-login-1.png",
      },
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
      
      Google Login (Attempted)
      
      - Tried implementing Google login through Spring Security, but ran into unexpected import issues.
      - As a workaround, used a direct \`<a>\` tag to initiate login.
      - Login succeeded, but fetching user data after login failed due to security configuration issues.
      
      ![Google Login Code]({media.googleLogin.image})
      `,
      ko: `
      회원가입

      📽️ [회원가입 데모 영상]({media.signup.video})
      
      - 이메일 중복 여부를 확인한 후에 회원가입이 가능합니다.
      - 비밀번호는 PBKDF2로 해시 처리됩니다.
      - 같은 비밀번호여도 해시 결과가 매번 달라 추측이 어렵습니다.
      
      ![회원가입 코드]({media.signup.image})
      
      ---
      
      로그인

      📽️ [로그인 데모 영상]({media.login.video})
      
      - 입력한 비밀번호와 서버에 저장된 해시값을 PBKDF2로 비교합니다.
      - 일치할 경우에만 로그인이 됩니다.
      
      ![로그인 코드]({media.login.image})
      
      구글 로그인 (시도)
      
      - Spring Security로 구글 로그인을 구현하려 했지만, 설정 중 import 오류가 발생했습니다.
      - 우회 방법으로 \`<a>\` 태그를 사용해 로그인을 시도했습니다.
      - 로그인은 성공했지만, 사용자 정보를 가져오는 데는 실패했습니다.
      
      ![구글 로그인 코드]({media.googleLogin.image})
      `,
    },
  },
  {
    title: {
      en: "Homepage & Product View",
      ko: "홈페이지 및 상품조회",
    },
    description: {
      en: "Displays products on the homepage and allows users to view product details.",
      ko: "홈페이지에서 상품을 보여주고, 상세 조회가 가능합니다.",
    },
    image: "/images/horsepower/horsepower-products-main.png",
    availability: true,
    details: {
      en: "The homepage shows product images using a Bootstrap carousel and dynamically renders items with Thymeleaf's looping. Products without images show a 'No Image' placeholder. Each product can be clicked to view details, which are fetched using a product ID and passed through a custom ProductInfo domain object.",
      ko: "홈페이지에서는 부트스트랩 캐러셀을 활용해 상품 이미지를 보여주며, Thymeleaf의 반복문을 사용해 상품들을 동적으로 렌더링합니다. 이미지가 없는 상품은 'No Image'를 표시하며, 각 상품은 클릭 시 product ID를 기반으로 상세 정보를 조회하고, ProductInfo 객체를 통해 데이터를 전달합니다.",
    },
    documentation: {
      en: `
      Homepage
      
      📽️ [Homepage Demo (Video)](images/horsepower/horsepower-products-main-vid1.mp4)
      
      - Products are displayed using \`th:each\` in Thymeleaf.
      - Images are shown in a Bootstrap carousel.
      - If no image exists, a default "No Image" placeholder is shown using \`th:if\` and \`th:unless\`.
      - Page navigation uses index values and \`@GetMapping\` to move through paginated results.
      - Products are grouped and fetched in sets of four from the database.
      - A custom \`ProductInfo\` domain combines product info, details, and image lists for cleaner data handling.
      
      ![Homepage Code](/images/horsepower/horsepower-products-main-1.png)
      
      ---
      
      Product Detail View
      
      - Product details are loaded using a product ID via \`@GetMapping\`.
      - The same \`ProductInfo\` domain is used to simplify passing multiple related data points to the view.
      
      ![Product Detail](/images/horsepower/horsepower-products-main-2.png)
      `,
      ko: `
      홈페이지
      
      📽️ [홈페이지 데모 영상](images/horsepower/horsepower-products-main-vid1.mp4)
      
      - Thymeleaf의 \`th:each\`를 이용해 상품 리스트를 순회하며 출력합니다.
      - 상품 이미지는 Bootstrap의 캐러셀 기능으로 보여줍니다.
      - 이미지가 없는 상품은 \`th:if\`와 \`th:unless\`로 "No Image"를 표시합니다.
      - 인덱스를 활용한 \`@GetMapping\`으로 페이지를 전환하며, 현재는 DB에서 4개씩 상품을 불러옵니다.
      - Product, List<product_detail>, List<product_pics>를 묶은 \`ProductInfo\` 객체를 통해 데이터를 한 번에 전달합니다.
      
      ![홈페이지 코드](/images/horsepower/horsepower-products-main-1.png)
      
      ---
      
      상품 상세조회
      
      - \`@GetMapping\`을 사용해 productId 기반으로 상품 정보를 가져옵니다.
      - 위와 동일하게 \`ProductInfo\` 객체를 사용해 여러 데이터를 간편하게 전달합니다.
      
      ![상품 상세 이미지](/images/horsepower/horsepower-products-main-2.png)
      `,
    },
  },
  {
    title: {
      en: "Cart Function",
      ko: "장바구니 기능",
    },
    description: {
      en: "Handles cart creation, item updates, and checkout prep",
      ko: "장바구니 생성, 상품 수정 및 결제 준비를 처리합니다",
    },
    image: "/images/horsepower/horsepower-cart.png",
    availability: true,
    details: {
      en: "Products are added to the cart using only minimal key information to reduce database bloat. Items are stored by ID and matched with full details from related tables. Users can adjust quantity or remove items before checkout, and cart state is saved throughout the process to prevent data loss from page errors.",
      ko: "불필요한 데이터 저장을 줄이기 위해 최소한의 핵심 정보만으로 장바구니에 상품을 담습니다. 상품 ID를 기준으로 연관된 테이블에서 필요한 정보를 불러옵니다. 결제 전 상품 수량을 수정하거나 삭제할 수 있으며, 중간 에러 발생 시에도 장바구니 상태가 유지되도록 데이터가 여러 번 저장됩니다.",
    },
    documentation: {
      en: `
      Add to Cart
      
      📽️ [Add to Cart Demo (Video)](/images/horsepower/horsepower-cart-vid1.mp4)
      
      - Only essential info (productId, product_detailId) is stored to keep the checkout table light and efficient.
      - User's email is pulled from the session and used to associate the cart.
      - A new \`CheckoutInfo\` entity collects and passes related data from product, detail, and image tables.
      - All selected products are sent as a List to the checkout view.
      
      ![Add to Cart Code](/images/horsepower/horsepower-cart1.png)
      
      ---
      
      Update Cart
      
      - Quantity and items in the cart can be edited before checkout.
      - Updates are linked to the \`checkoutId\` and passed when the "Proceed to Pay" button is clicked.
      - Data is saved at each key step:
        - When an item is first added
        - When quantity is changed
        - When an order is finalized (and cart is cleared)
      
      ![Cart Update Screenshot](/images/horsepower/horsepower-cart2.png)
      
      ---
      
      Improvements for Later
      
      - Currently, the cart requires a logged-in user.
      - Later, I plan to allow non-members to use the cart by storing temporary session data, which could be merged with a user account after login or sign-up.
      `,
      ko: `
      장바구니 담기
      
      📽️ [장바구니 담기 데모 영상](/images/horsepower/horsepower-cart-vid1.mp4)
      
      - checkout 테이블에는 productId와 product_detailId만 저장해 테이블을 가볍게 유지합니다.
      - 사용자 이메일은 HttpSession에서 불러와 장바구니 항목과 연결됩니다.
      - 새로 만든 \`CheckoutInfo\` 엔티티가 product, detail, image 데이터를 한 번에 전달합니다.
      - 선택한 상품들은 List 형태로 checkout 뷰로 전송됩니다.
      
      ![장바구니 담기 코드](/images/horsepower/horsepower-cart1.png)
      
      ---
      
      장바구니 수정
      
      - 결제 전 상품 수량을 조정하거나 삭제할 수 있습니다.
      - 변경된 수량은 \`checkoutId\`를 기준으로 업데이트되며 결제 시 적용됩니다.
      - 다음 단계마다 데이터를 저장해 에러 발생 시에도 장바구니 상태가 유지됩니다:
        - 상품을 처음 담을 때
        - 수량을 변경할 때
        - 결제 확정 시 주문 테이블로 이동 및 장바구니 비우기
      
      ![장바구니 수정 이미지](/images/horsepower/horsepower-cart2.png)
      
      ---
      
      추후 개선점
      
      - 현재는 로그인한 사용자만 장바구니를 사용할 수 있습니다.
      - 추후 비회원도 사용 가능하게 하여, 로그인 또는 회원가입 후 기존 세션의 장바구니를 연동할 수 있도록 개선할 예정입니다.
      `,
    },
  },

  {
    title: {
      en: "Payment Function",
      ko: "결제 기능",
    },
    description: {
      en: "Processes address input, order saving, and checkout-to-order transitions",
      ko: "주소 입력, 주문 저장, 장바구니에서 주문으로의 전환을 처리합니다",
    },
    image: "/images/horsepower/horsepower-pay.png",
    availability: true,
    details: {
      en: "During checkout, users enter delivery and billing addresses. If both are the same, the billing field is auto-filled. All purchase data is sent at once via @RequestBody, and after saving to the order table, stock levels are updated accordingly. Transactions are protected using @Transactional, and each order is assigned a unique order number.",
      ko: "결제 단계에서는 배송지와 청구지 주소를 입력할 수 있으며, 같은 경우 자동으로 복사됩니다. 구매 정보는 @RequestBody를 통해 한 번에 전달되며, 주문 정보가 저장되면 재고 수량이 차감됩니다. 모든 작업은 @Transactional로 보호되고, 주문에는 고유한 orderNumber가 부여됩니다.",
    },
    documentation: {
      en: `
      Payment Page
      
      - Users enter delivery and billing addresses.
      - If both are the same, billing info is auto-filled by checking a box.
      - The right side shows an order summary, including quantity and price per item.
      
      ![Payment Form](/images/horsepower/horsepower-pay.png)
      
      ![BIlling Info](/images/horsepower/horsepower-pay1.png)
      
      ---
      
      Saving Orders
      
      - All form data is submitted using \`@RequestBody\` and sent to a RestController.
      - After saving the order, inventory is updated to reflect the number of items purchased.
      - Users not logged in can still place orders by using nullable \`userId\` and \`userEmail\` from session.
      
      ![RequestBody Controller](/images/horsepower/horsepower-pay2.png)
      
      ---
      
      Transaction Handling
      
      - \`@Transactional\` ensures all steps complete successfully, or nothing is saved.
      - Once the order is saved, values from the checkout table are moved to the order table, and the original checkout entries are deleted.
      - A random 16-character order number (letters + digits) is generated to uniquely identify each order.
      - If a duplicate order number is detected, it retries (up to 1000 times) until a unique one is found.
      
      ![Order Number Logic](/images/horsepower/horsepower-pay3.png)
      `,
      ko: `
      결제 페이지
      
      - 사용자는 배송지와 청구지 주소를 입력합니다.
      - 두 주소가 같으면 체크박스로 청구지에 배송지 정보를 자동 복사합니다.
      - 오른쪽에는 구매한 상품 목록과 개별 가격이 표시됩니다.
      
      ![결제 폼](/images/horsepower/horsepower-pay.png)
      
      ![주문 요약](/images/horsepower/horsepower-pay1.png)
      
      ---
      
      주문 저장
      
      - 모든 데이터는 \`@RequestBody\`로 한번에 RestController로 전송됩니다.
      - 주문이 저장되면, 해당 수량만큼 재고가 차감됩니다.
      - 비로그인 사용자의 경우에도 \`userId\`, \`userEmail\`을 session에서 nullable로 받아 주문이 가능합니다.
      
      ![RequestBody 컨트롤러](/images/horsepower/horsepower-pay2.png)
      
      ---
      
      트랜잭션 처리
      
      - \`@Transactional\`을 사용해 모든 단계가 완료되지 않으면 데이터가 저장되지 않도록 설정했습니다.
      - 주문이 성공적으로 저장되면 checkout 테이블의 값들이 order 테이블로 이동하고, 기존 항목은 삭제됩니다.
      - 주문마다 16자리 고유 orderNumber(숫자 + 알파벳)를 생성해 저장합니다.
      - 이미 존재하는 orderNumber가 발견되면, 최대 1000번까지 재생성하여 충돌을 방지합니다.
      
      ![OrderNumber 로직](/images/horsepower/horsepower-pay3.png)
      `,
    },
  },

  {
    title: {
      en: "Admin Page",
      ko: "관리자 페이지",
    },
    description: {
      en: "Manages users, products, and orders with file cleanup and batch input",
      ko: "사용자, 상품, 주문을 관리하며 파일 정리 및 일괄 입력을 지원합니다",
    },
    image: "/images/horsepower/horsepower-admin.png",
    availability: true,
    details: {
      en: "The admin panel allows user and order management (RUD), and full CRUD control for products. It includes file cleanup on deletion and supports registering multiple product variations using JavaScript form cloning. Images are uploaded in batches via MultipartFile[] and saved individually.",
      ko: "관리자 페이지에서는 사용자 및 주문 정보를 RUD로 관리할 수 있고, 상품은 CRUD 전체가 가능합니다. 상품 삭제 시 불필요한 이미지 파일을 제거하며, JavaScript로 상품 상세 정보를 복수 입력받아 처리할 수 있습니다. 사진은 MultipartFile[]로 여러 개를 한 번에 업로드할 수 있습니다.",
    },
    documentation: {
      en: `
      Admin Dashboard
      
      📷 
      ![Admin Page Screenshot](/images/horsepower/horsepower-admin.png)
      
      - **User Management**: Read, update, and delete users by passing \`userId\` via Thymeleaf.
      - **Product Management**: Full CRUD supported. Product photos are deleted from storage via \`FileManagerService\` to free up space.
      - **Order View**: Orders can be read and reviewed using \`orderId\`.
      
      ---
      
      Product Registration
      
      📷 
      ![Product Form 1](/images/horsepower/horsepower-admin1.png)
      
      📷 
      ![Product Form 2](/images/horsepower/horsepower-admin2.png)
      
      - Product details are entered using JavaScript \`.clone()\`, allowing multiple variations per product.
      - Parameters for each variation are grouped into a list and appended to \`formData\` in the frontend.
      
      📷 
      ![Product Upload Code](/images/horsepower/horsepower-admin3.png)
      `,
      ko: `
      관리자 대시보드
      
      📷 
      ![관리자 페이지 스크린샷](/images/horsepower/horsepower-admin.png)
      
      - **사용자 관리**: \`userId\`를 Thymeleaf로 넘겨 사용자 정보 조회, 수정, 삭제가 가능합니다.
      - **상품 관리**: CRUD 모두 가능하며, 삭제 시 \`FileManagerService\`를 통해 이미지 파일과 DB 항목을 함께 정리합니다.
      - **주문 조회**: \`orderId\`를 통해 주문 정보를 조회할 수 있습니다.
      
      ---
      
      상품 등록
      
      📷 
      ![상품 등록 폼 1](/images/horsepower/horsepower-admin1.png)
      
      📷 
      ![상품 등록 폼 2](/images/horsepower/horsepower-admin2.png)
      
      - JavaScript의 \`.clone()\`을 활용해 하나의 상품에 여러 상품 상세 정보를 입력할 수 있습니다.
      - 각 상품 상세 정보를 list로 묶어 \`formData\`에 append하여 전송합니다.
      
      📷 
      ![상품 업로드 코드](/images/horsepower/horsepower-admin3.png)
      `,
    },
  },

  // Add more functions as needed
];
