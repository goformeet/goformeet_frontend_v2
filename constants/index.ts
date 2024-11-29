import path from "path";
import { title } from "process";

export const navLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Our Experts",
    route: "/hosts",
  },
];

export const footerLinks = [
  {
    label: "About",
    route: "/",
  },
  {
    label: "Team",
    route: "/team",
  },
  {
    label: "Careers",
    route: "https://www.linkedin.com/company/goformeet/jobs/",
  },
  {
    label: "Faq",
    route: "/faq",
  },
  {
    label: "Blogs",
    route: "/blogs",
  },
  {
    label: "Podcast",
    route: "/podcast",
  },
  {
    label: "Support",
    route: "/support",
  },
];

export const videos = [
  { id: "qKC5_F13EVo", title: "From Scratch to Scale: Building Great Products with Akhil Agarwal" },
  { id: "pBax3VmedPA", title: "Unleash the power of Marketing: Insights from Rohit Krishnam" },
  { id: "yxQpKuMremg", title: "Mastering Financial Decisions with Pramodh | Goformeet Podcast" },
  { id: "ddyBGyF6qG0", title: "From Marketing Strategies to Paw-sitive Vibes: Managing Brands and Pets with Sotchvilla's Human" },
  { id: "iwyonXO3vnU", title: "Building a Dream: The Journey of Inik Events with Lakshmipriya & Lekshmi Tallam" },
  { id: "uNYc9eG1fjI", title: "Sustainable Fashion Meets E-Commerce: Insights with Dheeraj Razdan" },
  { id: "-WjoofoHiQM", title: "Designing for Innovation: A Conversation with Product Designer Gauthier Raguin" },
  { id: "U2Gth3shSK4", title: "Angel Investing and Startup Growth: Insights from Thaneshwar Singh" },
  { id: "ebeFFdVK9sg", title: "Navigating Legal Complexities: Insights from Advocate Senthil" },
  { id: "6Abr7qFvjdM", title: "Revolutionizing Cloud Security: Insights with Ashwani Paliwal, CEO of SecOps Solution" },
  { id: "lz3Oew-UvPA", title: "Innovating the Future of Technology with Dr. S Reine De Reanzi | Goformeet Podcast" },
  { id: "-_oHkZ8TWiI", title: "Level up your social life | ft. Sagar Agrawal | oopar.club" },
  { id: "eufC-LFw3ew", title: "Transforming Education with Ed-Tech: Anuj Mishra's Journey & Insights | Goformeet Podcast" },
  { id: "49aZiqgaP7o", title: "Goformeet Podcast | A Conversation with CA Lanley D'Souza & Saurav Kumar" }
];

export const faqData = {
  hosts: [
    { question: "How does a expert set up their availability and rates on Goformeet?", answer: "Experts can set up their availability and rates through their profile settings." },
    { question: "Can a expert customize meeting types and prices?", answer: "Yes, experts can customize meeting types and set different prices for each." },
    { question: "What percentage of the booking fee does Goformeet take from experts?", answer: "Goformeet takes a small commission from each booking; details are available in the expert agreement." },
    { question: "How does Goformeet handle no-shows or cancellations?", answer: "Experts are compensated according to Goformeet's no-show and cancellation policies." },
    { question: "Can a expert communicate with clients before a meeting?", answer: "No, experts can message clients via Goformeet’s secure messaging system to clarify details." },
    { question: "How does a expert improve their visibility and attract clients on Goformeet?", answer: "Experts can enhance visibility by maintaining high ratings, responding quickly, and completing a professional profile." },
    { question: "Are there guidelines for setting up a professional expert profile?", answer: "Yes, Goformeet provides guidelines to help experts create a professional profile with a photo and detailed descriptions." },
    { question: "Can a expert pause or temporarily disable their profile?", answer: "Experts can temporarily disable their profile through account settings if unavailable." },
    { question: "What should a expert do if they need to reschedule a meeting?", answer: "Experts should notify the client via Goformeet’s messaging system and propose a new time." },
    { question: "How are reviews and ratings handled for experts?", answer: "Clients can rate and review experts after a session, which impacts visibility and credibility on the platform." },
    { question: "What analytics does Goformeet provide to experts to help track their performance?", answer: "Goformeet provides performance metrics like session count, client retention, and revenue trends in the dashboard." },
    { question: "How does a expert handle a refund request from a client?", answer: "Refund requests are handled by Goformeet support, which may adjust the expert's earnings if necessary." },
    { question: "Can a expert offer discounts or promo codes to clients?", answer: "Yes, experts can create promo codes and discounts through the 'Promotions' section." },
    { question: "How long does it take to receive payments after a session?", answer: "Payments are typically processed within 3-5 business days after a session." },
    { question: "What should a expert do if a client violates Goformeet’s guidelines?", answer: "Experts should report any violations immediately using the 'Report' feature or by contacting support." },
    { question: "Can a expert offer group sessions on Goformeet?", answer: "Yes, experts can set up group sessions by configuring the session settings accordingly." },
    { question: "What types of support does Goformeet offer if a expert experiences technical issues?", answer: "Goformeet provides technical support via chat, email, and phone for any platform-related issues." }
  ],
  users: [
    { question: "Is Goformeet free to use?", answer: "Yes, Goformeet is free to download and use. You have to pay for the meetings you schedule." },
    { question: "How does a user find and book a session with a expert on Goformeet?", answer: "Users can browse experts, view their profiles, and book sessions through the platform." },
    { question: "What types of professionals can a user connect with on Goformeet?", answer: "Goformeet offers access to various professionals, including mentors, consultants, and experts across fields." },
    { question: "How are meeting fees structured, and are there any extra charges?", answer: "Meeting fees are set by each expert, and the total cost is shown before booking. There are no hidden charges." },
    { question: "How does a user cancel or reschedule a meeting?", answer: "Users can cancel or reschedule a meeting through the session details page, subject to the expert’s policies." },
    { question: "What if my expert cancels or doesn’t show up for a session?", answer: "If a expert cancels or is a no-show, users are eligible for a full refund or rescheduling." },
    { question: "Can a user contact a expert before the session for clarification?", answer: "No, users can contact experts through Goformeet’s secure messaging system to clarify session details." },
    { question: "How are expert ratings and reviews handled on Goformeet?", answer: "Users can rate and review experts after each session. Ratings are visible on the expert's profile to help others." },
    { question: "Is there a way to save favorite experts for future bookings?", answer: "Yes, users can add experts to their favorites list for easy access and future bookings." },
    { question: "Can a user refer friends to Goformeet?", answer: "Yes, Goformeet has a referral program where users can invite friends and earn rewards." },
    { question: "How does Goformeet ensure privacy during meetings?", answer: "Goformeet uses encrypted channels and secure communication to protect users' privacy." },
    { question: "Are there guidelines for appropriate behavior during sessions?", answer: "Yes, Goformeet provides guidelines to promote respectful and professional conduct during sessions." },
    { question: "How can a user report an issue or misconduct?", answer: "Users can report issues or misconduct through the session details or by contacting Goformeet support." },
    { question: "Does Goformeet offer customer support for users?", answer: "Yes, Goformeet offers customer support via email, chat, and phone to assist users." },
    { question: "What should a user do if they encounter technical issues during a session?", answer: "If technical issues arise, users can contact Goformeet’s support team for immediate assistance." },
    { question: "Can a user use promo codes or discounts when booking a session?", answer: "Yes, users can apply promo codes during checkout to receive discounts on session fees." },
    { question: "How does a user know if a expert is available and ready for bookings?", answer: "Experts’ availability is displayed on their profiles, which users can check before booking." },
    { question: "Are there specific guidelines for the types of sessions allowed on Goformeet?", answer: "Yes, Goformeet has session guidelines to ensure quality and professionalism for all users." }
  ]
};

export const LandingPageProfessions = [
  "Entrepreneur",
  "Influencer",
  "Life coach",
  "Model",
  "Doctor",
  "Fashion designer",
  "More",
];

export const LandingPageProfiles = [
  {
    profession: "Entrepreneur",
    profiles: [
      {
        name: "Thaneshwar Singh",
        username: "@Thaneshwar",
        location: "Bengaluru",
        description: "Thaneshwar Singh boasts an 8-year marketing background and 7 years as an entrepreneur. He's guided 100+ startups, invested in a couple of them, and leads Be an Angel Network, and Co founder of Ientra Business Solutions Private Limited collaborating with major players like Social Alpha, IPV, and Rainmatter. Thaneshwar's influence also extends to multiple educational institutions with his Incubate India Initiative.",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/undefined/image_cropper_1725974067972.jpg",
          isVerified: true,
        },
      {
        name: "Aswani Paliwal",
        location: "Bengaluru",
        username: "@ashwanipaliwal",
        description: "Agent-less Patch & Vulnerability Management Platform | Founder & CEO, SecOps Solution. I work on problems in cloud security, network security and privacy.",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/undefined/image_cropper_3B4F29AB-FFAF-42B3-93F6-2A6AF80DAE94-16410-000006981C4BB587.jpg",
        isVerified: true,},
      {
        name: "Anuj Mishra",
        username: "@anujmishra",
        location: "Bengaluru",
        description: "Founder, Genius Labs | B.Tech, IIT Kanpur | 18+ Years of Experience in Tech & Education I am the founder of Genius Labs, an innovative ed-tech platform dedicated to transforming the learning experience. With over 18 years of experience in the tech and education sectors, I have a deep passion for bridging the gap between technology and education. As a B.Tech graduate from IIT Kanpur, I've had the honor of mentoring students to exceptional achievements, including securing AIR 2 in JEE Main and Rank 1 in KVPY. My journey has also been enriched by internships at prestigious institutions such as IIM Bangalore, IISc Bengaluru, and NTU Singapore, where I gained valuable insights that continue to drive my work in the ed-tech space.",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/anujmishra/image_cropper_041C1BD5-C004-46A2-A244-440A6EDA4C93-67820-000013A3E39228EC.jpg",   
        isVerified: true,   },
      {
        name: "Dr Reine",
        username: "@reine",
        location: "Bengaluru",
        description:
          "Founder & CEO | Angel Investor | Advisor On a mission to transform quality engineering. Solving challenges in “last mile execution” across various industries Strategist, practitioner, having demonstrated the ability to lead diverse teams to new levels of success in a variety of highly competitive, cutting-edge markets and fast-paced environments. I have progressive experience and proven record of, significant, successful contribution in product-development life cycle methodologies, project management, process improvement, business analysis/evaluation, quality management, supplier management, and quality management systems, processes, standards, and systems in a wide range of organizations that previously had no standards or programs in place. Built dashboards by gathering data, analyzing and providing insights using R programming Managed competing priorities to maintain efficiency with cross IBM Business Units Worked in an integrated and distributed team, aligned multiple groups around a single objective. Adept in key presentations to executives Front facing with customers for technical & business triaging for product support Leading different release management timelines across different teams, geo locations Design thinking to solve issues/conflicts/open questions to closure/arrive at consensus If your answers to the following questions are 'Yes'... Are your customer tickets pulling you in all directions that, you are looking for ways to contain them? Do you struggle to assess/measure and strategize/optimize quality not limiting to test coverage? Do you need automation/have an automation suite but have no insights on ROI? Do you want to Challenge, Inspire and Transform your people? Are you looking for someone who is fluid and has worked in startup/SaaS/Cloud?",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/reine/profile_pic_cbd3a94b-daea-46fb-b3ad-abfdcb24481b.avif",
        isVerified: true,},
    ],
  },
  {
    profession: "Influencer",
    profiles: [
      {
        name: "Rumana",
        username: "@rumana",
        location: "Bengaluru",
        description: "Live life and live food and entertainment",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/rumana/rumana_1.png",
          isVerified: true,},
      {
        name: "Akash Bhaskar",
        location: "Bengaluru",
        username: "@akashbhaskar",
        description:
          "I am an influencer and marketing expert.",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/undefined/image_cropper_1729235307218.jpg",
          isVerified: true,},
      {
        name: "Yogesh Chugh",
        username: "@yogesh_c",
        location: "Bengaluru",
        description:
          "Serial Entreprineur.... Assisted start up in growing nation wide growth,.... marketing strategies specialist.",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/yogesh_c/yogesh_c_1.png",
          isVerified: true,},
      {
        name: "Salma Moosa",
        username: "@salmamoosa",
        location: "Bengaluru",
        description: "I have worked closed with startup and biz founders for 3 decades towards their goals for growth. we mentor and guide to get more customer acquisition, investments and operations streamlining. have been a public speaker and influencer for entrepreneurs from across the world. transforming oneself for growth is the key.",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/salmamoosa/salmamoosa_1.png",
          isVerified: true,},
    ],
  },
  {
    profession: "Life coach",
    profiles: [
      {
        name: "Mansi Dhanak",
        username: "@mansi",
        location: "Mumbai",
        description:
          "Celebrity Manifestation Coach working with VIP clients globally. I take my clients to their highest potential with my life coaching. As an entrepreneur I also help brands scale with Matchmaking, yes Revurge gets the right face for your brand. Getting a Celebrity Investor or Brand Ambassador is 💯 possible! Looking to onboard a celebrity for your Brand?",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F9930998011%2F1707197122220594?alt=media&token=4017fcb2-c6c0-47d9-bccb-73457fcfe4d5",
        isVerified: true,},
      {
        name: "Koutilya",
        location: "Nagpur",
        username: "@indigochildkc",
        description:
          "Clinical Psychologist and Life Coach ⚡Service ( Online / Offline) *Counseling/ Psychotherapy *Individual/Couple/Group Session *Chakra Cleansing/Healing *Past Life Regression *Life Coaching *Mindfulness *LGBTQ Friendly ⚡Psychology Consulting * Anxiety/Depression * Stress/ Anger Issue * Parenting/Relationship * Pre Natal/Post Partum * Personal Empowerment * Confidence Building * Trauma / Phobia * Addiction * Career",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/undefined/image_cropper_1720083377374.jpg",
        isVerified: true, },
      {
        name: "Sushma",
        username: "@sushma",
        location: "Bengaluru",
        description:
          "My guidence n remeady improve confidence , personality ,life style to librate person to achive positivity , health , wealth ,growth , happiness , fulfillment because we hv one life to live as human",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/sushma/sushma_1.png",
        isVerified: true,  },
      {
        name: "Jayshree",
        username: "@soulshree",
        location: "Mumbai",
        description:
          "Jayshree Makwana Profile: English Communication & Life Coach| Former VogueStar Mrs.Maharashtra, 2023l Founder- Think To Learn। Spiritual Blogger| Art Therapy Enthusiast Story: As a firm believer in living a wholesome life, I have always been drawn to exploring the depths of the human experience. From a young age, I have been fascinated by the power of language and its ability to shape our thoughts and emotions. This fascination led me to become a spoken English (TESOL) trainer with a unique and intuitive approach to teaching. With a double PG in political science and sociology, I have over 7 years of experience in teaching and training individuals of all ages and backgrounds. My sessions not only focus on improving English language skills, but also on overall personal development and upskilling. But my passion for sharing knowledge and empowering others doesn't stop in the classroom. For over 4 years, I have been using my blog, www.bakkbakkingjayshree.wordpress.com, as a platform to share pieces of my heart, mind, and soul with the world. From musings on life and the universe to discussions on emotions, society, and parenting, I cover a wide range of topics that reflect my diverse interests and experiences. If you're looking for a creative and intuitive trainer who can help you take your language skills and personal growth to the next level, look no further. Let's connect and embark on a journey of learning and personal growth.",
        image:
         "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/GuestImages%2F9833049391%2F1710148200445030?alt=media&token=0374233d-8755-4fa8-8311-98a2f2f3f012",
         isVerified: true,},
    ],
  },
  {
    profession: "Model",
    profiles: [
      {
        name: "Pyaari Rajput",
        username: "@pyaari",
        location: "Mumbai",
        description: "Namaste, I am a TV actor and a Life coach. I help people see the brighter side in any given situation and also I love to heal and help. I am a listener and always there to give my advices on how to experience divine Joy.",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/pyaari/pyaari_1.png",
        isVerified: true,},
      {
        name: "Arzoo",
        username: "@arzoo_dhanda",
        location: "Ganaur",
        description:
          "I am here to know about you and help you improve yourself.",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/landingPageImages/arzoo.jpg",
      },
      {
        name: "Deeps",
        location: "Hyderabad",
        username: "@divinesoul1111",
        description: "I am a professional model, author",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/GuestImages%2F9021881665%2F1709908229363272?alt=media&token=9303cc64-6820-45b0-90cd-e9d6e1a09960",
      },
      {
        name: "zain",
        username: "@zainmohammed",
        location: "Bengaluru",
        description: "Im a model",
        image:
          "https://goformeet.s3.ap-south-1.amazonaws.com/zainmohammed/zainmohammed_1.png",
      },
    ],
  },
  {
    profession: "Doctor",
    profiles: [
      {
        name: "sruthy",
        username: "@shru@ortho",
        location: "Bengaluru",
        description:
          "Orthodontist",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F9567962758%2F1710319006944455?alt=media&token=1164ae0d-bf26-463b-874f-c939f8578794",
      },
      {
        name: "Saurabh Devas",
        location: "Benguluru",
        username: "@saurabhd86",
        description:
          "I am a dental surgeon. enthusiastic about sharing any professional guidance to anyone interested and have conversations with people of similiar interests .",
        image:
         "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F8310281618%2F1709271059085659?alt=media&token=6af809fb-a4a8-48cf-8074-20e5a73cc824",
      },
      {
        name: "Amit Dahiya",
        username: "@amitdahiya27",
        location: "Gurugram",
        description:
          "Hey.. I am Dr.Amit Dahiya..I am here to listen and help you.",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F8684809909%2F1711686194785222?alt=media&token=2b59d0c3-2c8b-4593-81f1-28547434c9d7",
      },
      {
        name: "Pulkit",
        username: "@pulkit",
        location: "Mugalpur Urf Aghwanpur Mustahk",
        description:
          "I am Dr. Pulkit Gupta, medical professional ready to help others.Born to serve the society.",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F9654499884%2F1709454227495974?alt=media&token=0c6825d4-db37-4395-88aa-0a1fdbb8f686",
      },
    ],
  },
  {
    profession: "Fashion Designer",
    profiles: [
      {
        name: "Lin",
        username: "@linhat",
        location: "Mira Bhayandar",
        description:
          "versatile designer good at Fashion illustration, design development, embroidery designing pattern making and garment construction",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F9820883163%2F1711784185785669?alt=media&token=c37de295-7139-4e9a-b5f4-6f4ecc300154",
      },
      {
        name: "nishtha pahari",
        location: "Bilaspur",
        username: "@nishtha1305",
        description:
          "I am a fashion designer, fresher ,freelancer.",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/GuestImages%2F9340459168%2F1709718702434718?alt=media&token=846cb0b7-6c6f-43d6-9ae9-89cc551bf23f",
      },
      {
        name: "Bichin.Chandran",
        username: "@sebic",
        location: "Kollam",
        description:
          "I'm a simple humble human with an open minded and also God blessed me with some sort of skills like Designing, Illustration, Dancing,Acting , also I'm a creative and detail oriented Fashion Designer with a drive for searching for new forms of self expression. Adept in collaboration with the professionals and working in a team to achieve higher goals and deadlines. A skillfully Fashion Illustrator with extensive knowledge of different mediums and softwares, Above all ,an avide learner and a student of ever enlarging world of Fashion.",
        image:
        "https://firebasestorage.googleapis.com/v0/b/connectionapp-8dc63.appspot.com/o/HostImages%2F9048663505%2F1709560793367122?alt=media&token=91bec60b-916d-4386-b05c-d5f5015ed603",
      },
      {
        name: "Aastha Singhal",
        username: "@singhalaashi555",
        location: "New Delhi",
        description:
          "I am Aastha. i am hardworking and team oriented person",
        image:
        "https://goformeet.s3.ap-south-1.amazonaws.com/singhalaashi555/singhalaashi555_1.png",
      },
    ],
  },

];

export const whyChooseGoformeet = [
  {
    title: "Guaranteed Meetings",
    description: "No more no-shows or last-minute cancellations..",
    icon: "/assets/icons/guranteedMeetings.svg",
  },
  {
    title: "Top Professionals",
    description: "Access to industry experts and thought leaders.",
    icon: "/assets/icons/topProfessionals.svg",
  },
  {
    title: "Easy Scheduling",
    description: "Simple and intuitive booking process.",
    icon: "/assets/icons/easyScheduling.svg",
  },
  {
    title: "Secure and Confidential",
    description: "Your information is safe with us.",
    icon: "/assets/icons/secureAndConfidential.svg",
  },
];

export const EarnWithUsCards = [
  {
    title: "Endless Earning Opportunity",
    icon: "/assets/icons/creatorEarnings.svg",
    className: "mb-16 mt-19",
  },
  {
    title: "Community of 2k+ Hosts",
    icon: "/assets/icons/community.svg",
    className: "",
  },
];

export const FAQQuestions = [
  {
    id: "question-1",
    question: "01  Is Goformeet free to use?",
    answer:
      " Yes, Goformeet is free to download and use. You have to pay for the meetings you schedule ",
  },
  {
    id: "question-2",
    question: "02 Can I use Goformeet to schedule professional meetings?",
    answer:
      " Absolutely! Goformeet is perfect for both personal and professional use, allowing you to schedule meetings with anyone with whom you can vibe .",
  },
  {
    id: "question-3",
    question: "03 How does Goformeet prioritize safety and privacy?",
    answer:
      "Safety and privacy are paramount at Goformeet. We employ robust security measures to protect user data and ensure a safe and enjoyable experience for all.",
  },
  {
    id: "question-4",
    question: "04 Are there age restrictions for using Goformeet?",
    answer:
      "Users must be at least 18 years old to create an account on Goformeet.",
  },
  {
    id: "question-5",
    question: "05 Can I suggest new features or improvements for Goformeet?",
    answer:
      "We love hearing from our users! If you have any suggestions or feedback, please don't hesitate to reach out to us",
  },
];

export const UserReviews = [
  {
    imageUrl: "/assets/images/userReview.jpeg",
    name: "Sophie Jain",
    profession: "Actress",
    review:
      "As an actress, my schedule is always packed with auditions, rehearsals, and meetings with directors and producers. #Goformeet has been a game-changer for managing my busy calendar. Thanks to #Goformeet, I can focus more on my craft and less on logistical headaches. I highly recommend it to anyone in the entertainment industry!",
  },
];

export const ArchitectureJourneyCards = [
  {
    highlightedText: "Monetize",
    title: "Your Influence",
    description:
      "You can effortlessly earn cash by simply meeting people with no special skills required",
  },
  {
    highlightedText: "One-click",
    title: "Scheduling",
    description:
      "Hassle free connection with your followers with seamless booking through goformeet. More than 2k people meet their desired host and embraced connection",
  },
  {
    highlightedText: "Easily withdraw",
    title: "your earning",
    description:
      "The process of accessing your earnings is seamless.  you can quickly and securely transfer your income to all mode of digital payment method",
  },
  {
    highlightedText: "4/5",
    title: "User Rating",
    description:
      "Our users consistently rate their experience on #Goformeet as 4.8 out of 5.",
  },
];

export const adminSidebarLinks = [
  {
    displayName: "Hosts",
    pathName: "/admin/hosts",
  },
  {
    displayName: "Guests",
    pathName: "/admin/guests",
    // pathName: "/admin",
  },
  {
    displayName: "Users",
    pathName: "/admin/users",
  },
  {
    displayName: "Referals",
    // pathName: "/admin/referals",
    pathName: "/admin",
  },
  {
    displayName: "Orders & Payments",
    pathName: "/admin/orders",
    // pathName: "/admin",
  },
  {
    displayName: "Stock Images",
    // pathName: "/admin/stock-images",
    pathName: "/admin",
  },
  {
    displayName: "Reported Hosts",
    // pathName: "/admin/reported-hosts",
    pathName: "/admin",
  },
  {
    displayName: "KYC Verification",
    pathName: "/admin/verifications",
  },
  {
    displayName: "Withdrawls",
    // pathName: "/admin/withdrawls",
    pathName: "/admin",
  },
  {
    displayName: "Contacts Data",
    // pathName: "/admin/contacts-data",
    pathName: "/admin",
  },
  {
    displayName: "Messages",
    pathName: "/admin/messages",
  },
   {
    displayName: "Blogs",
    pathName: "/admin/blogs",
  },
];

export const hostCategories = [
  "All",
  "Companion",
  "Influencer",
  "Model",
  "Blogger",
  "Actor",
  "Entrepreneur",
  "Startup",
  "Doctor",
  "Engineer",
  "Photographer",
  "Student",
  "Freelancer",
  "Pilot",
  "Air Hostess",
  "Tourist Guide",
  "Musician",
  "Life Coach",
  "CA/CFO",
  "Accountant",
  "Architect",
  "Artist",
  "Lawyer",
  "Chef",
  "Financial Analyst",
  "Fitness Trainer",
  "Calligrapher",
  "Recruiter",
  "Sales Executive",
  "Graphic Designer",
  "Journalist",
  "Nurse",
  "Fashion Designer",
  "Govt. Servant",
  "Scientist",
  "Social Worker",
  "Teacher",
  "Others",
];

export const Creators = [

  {
    title: "Entrepreneur",
    path: "/hosts?profession=Entrepreneur&page=1",
  },
  {
    title: "Influencer",
    path: "/hosts?profession=Influencer&page=1",
  },
  {
    title: "Life Coach",
    path: "/hosts?profession=Life%20Coach&page=1",
  },
  {
    title: "Model",
    path: "/hosts?profession=Model&page=1",
  },
  {
    title: "Doctor",
    path: "/hosts?profession=Doctor&page=1",
  },
  {
    title: "Fashion designer",
    path: "/hosts?profession=Fashion%20Designer&page=1",
  },
  // "Influencer",
  // "Model",
  // "Entrepreneur",
  // "Startup",
  // "Doctor",
  // "Actor",
];

export const intrestTags = [
  "All",
  "Travel",
  "Foodie",
  "Music",
  "Sports",
  "Fitness",
  "Movies",
  "Reading",
  "Adventures",
  "Art",
  "Gaming",
  "Photography",
  "Fashion",
  "Dancing",
  "Cooking",
  "Hiking",
  "Pets",
  "Volunteer Work",
  "Technology",
  "Yoga",
  "Cars",
  "Science",
  "Gardening",
  "History",
  "DIY Projects",
  "Collecting",
  "Writing",
  "Meditation",
  "Education",
  "Theatre",
  "Board Games",
  "Finance",
  "Spirituality",
  "Language Learning",
  "Astronomy",
  "Environmentalism",
  "Wine Tasting",
  "Crafting",
  "Home Decor",
  "Blogging",
  "Social Media",
  "Politics",
  "Networking",
  "Adventure Sports",
  "Sustainability",
  "Entrepreneurship",
  "Outdoor Activities",
  "Biking",
  "Bird Watching",
  "Robotics",
  "Marine Life",
  "Cultural Studies",
  "Genealogy",
  "Public Speaking",
  "Survival Skills",
  "Magic",
  "Parkour",
  "Antiquing",
  "Magic Tricks",
  "Stand-Up Comedy",
  "Calligraphy",
  "Sculpting",
  "Pottery",
  "Cosplay",
  "Anime",
  "Martial Arts",
  "Skateboarding",
  "Surfing",
  "Sailing",
  "Horse Riding",
  "Kite Flying",
  "Archery",
  "Juggling",
  "Snowboarding",
  "Skiing",
  "Rock Climbing",
  "Camping",
  "Geocaching",
  "Urban Exploration",
  "Foraging",
  "Gardening",
  "Leatherworking",
  "Woodworking",
  "Metalworking",
  "Quilting",
  "Sewing",
  "Knitting",
  "Crocheting",
  "Embroidery",
  "Scrapbooking",
  "Model Building",
  "Model Railroading",
  "Train Spotting",
  "Stamp Collecting",
  "Coin Collecting",
  "Doll Collecting",
  "Puzzle Solving",
  "Trivia",
  "Genealogy",
  "Cartography",
];

export const languages = [
  "English",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Tamil",
  "Telugu",
  "Bengali",
  "Maithili",
  "Nepalese",
  "Sanskrit",
  "Urdu",
  "Assamese",
  "Dogri",
  "Gujarati",
  "Bodo",
  "Manipur",
  "Oriya",
  "Marathi",
  "Santali",
  "Punjabi",
  "Sindhi",
  "Konkani",
  "Kashmiri",
];