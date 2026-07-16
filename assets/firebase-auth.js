// Firebase configuration for Anchor Packaging (anchor-packin project)
const firebaseConfig = {
  apiKey: "AIzaSyDsZnZk1r_Bly7EOIIBe-oLkESIWsI4FJ4",
  authDomain: "anchor-packin.firebaseapp.com",
  projectId: "anchor-packin",
  storageBucket: "anchor-packin.firebasestorage.app",
  messagingSenderId: "12110769466",
  appId: "1:12110769466:web:669f4cc974733845277403",
  measurementId: "G-M2DPYPEQ4L"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function initials(nameOrEmail){
  if(!nameOrEmail) return "?";
  const parts = nameOrEmail.split(" ");
  if(parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nameOrEmail.slice(0,2).toUpperCase();
}

function renderAuthUI(user){
  // Supports multiple auth areas on one page (e.g. the nav bar AND a demo section)
  const areas = document.querySelectorAll('.auth-area, #authArea');
  if(!areas.length) return;

  areas.forEach((area) => {
    if(user){
      const name = user.displayName || user.email || "Signed in";
      area.innerHTML = `
        <div class="auth-chip" title="${user.email || ''}">
          <span class="auth-avatar">${initials(name)}</span>
          <span class="auth-name">${name.split(' ')[0]}</span>
        </div>
        <button class="nav-signout auth-signout-btn">Sign out</button>
      `;
      area.querySelector('.auth-signout-btn').onclick = () => auth.signOut();
    } else {
      area.innerHTML = `<button class="nav-signin auth-signin-btn">Sign in</button>`;
      const btn = area.querySelector('.auth-signin-btn');
      btn.onclick = () => {
        btn.textContent = "Signing in…";
        auth.signInWithPopup(googleProvider)
          .catch((err) => {
            console.error(err);
            alert("Sign-in didn't go through: " + err.message);
            btn.textContent = "Sign in";
          });
      };
    }
  });
}

auth.onAuthStateChanged(renderAuthUI);
