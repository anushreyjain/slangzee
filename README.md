# 🗨️ Slangzee 

**Slangzee** is a platform for discovering and sharing creative slang words and their meanings. It’s designed to foster creativity while ensuring a respectful and engaging environment.

### 🎉 Try It Out! 
I invite you to explore the live demo and share your creativity by submitting your own unique slangs. I would be thrilled to read and approve them!
Start contributing your slang creations on Slangzee! 

[Live Demo](https://slangzee.vercel.app/) 🚀

---

## 🛠️ Tech Stack 

- **Frontend & Backend**: Built using **Next.js**, with APIs implemented in **Next.js** itself.
- **Styling**: The interface is powered by **Tailwind CSS**.
- **Database**: Data management is handled using **MongoDB**.

---

## 🎯 Features 

1. **Authentication**:
   - User login is managed through **Auth0**.

2. **Slang Submission Workflow**:
   - Users can submit slangs, which enter a **pending state** until reviewed by an admin.
   - Pending slangs are marked with a **yellow clock badge** and are visible only in the **"My Creativity"** section.
   - Once approved, the **clock badge is replaced with a green approval badge**, and the slang becomes visible in the **"Everything"** tab.

3. **Tabs**:
   - **Everything**: Displays all approved slangs for everyone.
   - **Trending**: Shows slangs sorted by likes, with the most liked slang appearing at the top.
   - **My Creativity** (Logged-In Users): Displays slangs submitted by the user, both approved and pending.
   - **Saved** (Logged-In Users): Lists all slangs bookmarked by the user.

4. **Public Access**:
   - Non-logged-in users can access the **Everything** and **Trending** tabs.

5. **User Features (Logged-In)**:
   - Like, bookmark, and submit slangs.

6. **Content Moderation**:
   - A system to detect and block racial or hate content before approval.

---

## 🌐 Required Environment Variables 

To run this app, ensure the following environment variables are configured:

```env
AUTH0_BASE_URL=YOUR_AUTH0_BASE_URL
NEXT_PUBLIC_BASE_URL=YOUR_NEXT_PUBLIC_BASE_URL
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
MONGODB_URI=YOUR_MONGODB_URI
AUTH0_SECRET=YOUR_AUTH0_SECRET
AUTH0_ISSUER_BASE_URL=YOUR_AUTH0_ISSUER_BASE_URL
```

---

## ⚙️ Installation

Follow these steps to set up the app locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/anushreyjain/slangzee.git
    cd slangzee
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   - Create a .env.local file and add the required variables.
  
4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Visit: :** [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✍️ Contribution
We welcome your contributions to improve Slangzee! Feel free to fork the repository, create a feature branch, and submit a pull request.
    
