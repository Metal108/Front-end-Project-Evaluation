import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
function Logo({ dark = false }) {
  return (
    <Link className={`logo ${dark ? "dark" : ""}`} to="/">
      <b>P</b>
      <span>Peers<span>Forge</span></span>
    </Link>
  );
}
function Layout() {
  const nav = useNavigate();
  const items = [
    ["dashboard", "⌂", "Dashboard"],
    ["peers", "♧", "Find Peers"],
    ["meetings", "▣", "Meetings"],
    ["resources", "▤", "Resources"],
    ["notes", "✎", "My Notes"],
    ["profile", "◉", "Profile"],
  ];
  return (
    <div className="shell">
      <aside>
        <Logo />
        <small>WORKSPACE</small>
        {items.map(([path, icon, name]) => {
          const disabled = path === "peers" || path === "resources";
          if (disabled) {
            return (
              <button
                className="nav nav-disabled"
                key={path}
                onClick={(e) => e.preventDefault()}
              >
                <i>{icon}</i>{name}
              </button>
            );
          }
          return (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) =>
                isActive ? "nav active" : "nav"
              }
            >
              <i>{icon}</i>{name}
            </NavLink>
          );
        })}
        <div className="side-bottom">
          <div className="side-card">
            ✦
            <strong>Build together</strong>
            <p>Find peers who match your skills.</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("pf_login");
              nav("/");
            }}
          >
            ↪ Log out
          </button>
        </div>
      </aside>
      <main>
        <header>
          <span className="mobile-logo">Peers<span>Forge</span></span>
          <div className="header-user">
            <button>♢</button>
            <Link to="/profile">
              Arsh
            </Link>
          </div>
        </header>
        <div className="content"><Outlet /></div>
      </main>
    </div>
  );
}
function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Logo dark />
        <div>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <Link to="/login">Sign in</Link>
        </div>
        <Link className="btn primary" to="/login">Get started →</Link>
      </nav>
      <section className="hero">
        <div className="pill">✦ Student collaboration, made simple</div>
        <h1>Find your people.<br /><em>Build together.</em></h1>
        <p>
          Discover peers, explore student projects and keep your learning
          resources organized — all in one simple workspace.
        </p>
        <div className="hero-buttons">
          <Link className="btn primary big" to="/login">Explore PeersForge →</Link>
          <a className="btn light big" href="#features">See features</a>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80" />
          <div className="floating"><b>12</b><span>new connections</span></div>
        </div>
      </section>
      <section id="features" className="features">
        <small>WHAT YOU CAN DO</small>
        <h2>Everything students need to<br /><em>learn together.</em></h2>
        <div className="feature-grid">
          <Feature icon="♧" title="Find Peers" text="Search by name or skill and connect with students." />
          <Feature icon="◫" title="Schedule Meetings" text="Add a meeting name, date and time and keep your schedule organized." />
          <Feature icon="▤" title="Resource Hub" text="Save useful React, Java, DSA and web resources." />
          <Feature icon="✎" title="My Notes" text="Create notebooks like Java Notes and write anything inside." />
        </div>
      </section>
      <section id="how" className="how">
        <div>
          <small>HOW IT WORKS</small>
          <h2>Simple. Useful.<br />Student-first.</h2>
        </div>
        <div>
          {["Create your profile", "Discover peers", "Learn & build"].map((x, i) => (
            <div className="step" key={x}>
              <b>0{i + 1}</b><span>{x}</span>
            </div>
          ))}
        </div>
      </section>
      <footer>© 2026 PeersForge · Built with React</footer>
    </div>
  );
}
function Feature({ icon, title, text }) {
  return (
    <article className="feature-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <b>Available in workspace</b>
    </article>
  );
}
function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  function submit(e) {
    e.preventDefault();
    localStorage.setItem("pf_login", "yes");
    localStorage.setItem("pf_user", JSON.stringify({ email, password: pass }));
    nav("/dashboard");
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="centered"><Logo dark /></div>
        <h1>Welcome back</h1>
        <p>Enter anything and continue to your student workspace.</p>
        <form onSubmit={submit}>
          <label>Student ID / Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter anything" />
          </label>
          <label>Password
            <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter anything" />
          </label>
          <button className="btn primary full">Continue →</button>
        </form>
        <small>No validation or backend — this is a frontend demo.</small>
      </div>
    </div>
  );
}
function Dashboard() {
  return (
    <>
      <div className="heading">
        <div>
          <small>YOUR WORKSPACE</small>
          <h1>Good afternoon, Arsh <em>✦</em></h1>
          <p>Here’s a quick look at your student network.</p>
        </div>
      </div>
      <div className="stats">
        {[["0", "Upcoming meetings"], ["0", "Connections"], ["0", "Saved resources"], ["0%", "Profile complete"]].map((s) => (
          <div key={s[1]}><span>↗</span><b>{s[0]}</b><p>{s[1]}</p></div>
        ))}
      </div>
    </>
  );
}
function Meetings() {
  const [list, setList] = useState(() => JSON.parse(localStorage.getItem("pf_user_meetings") || "[]"));
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Study session");
  const [place, setPlace] = useState("Online");
  useEffect(() => localStorage.setItem("pf_user_meetings", JSON.stringify(list)), [list]);
  function add(e) {
    e.preventDefault();
    if (!name || !date || !time) return;
    setList([...list, { id: Date.now(), title: name, date, time, type, place }]);
    setName(""); setDate(""); setTime("");
  }
  function remove(id) {
    setList(list.filter((m) => m.id !== id));
  }
  const all = [...list].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
  );
  return (
    <>
      <div className="heading"><div><small>PLAN TOGETHER</small><h1>Meetings</h1></div></div>
      <div className="meeting-layout">
        <form className="panel meeting-form" onSubmit={add}>
          <h2>New meeting</h2>
          <label>Meeting name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Java revision" /></label>
          <div className="date-time">
            <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label>Time<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
          </div>
          <label>Type<select value={type} onChange={(e) => setType(e.target.value)}><option>Study session</option><option>Team meeting</option><option>Practice</option></select></label>
          <label>Place<input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Online / Library" /></label>
          <button className="btn primary full">+ Add meeting</button>
        </form>
        <section>
          <div className="meeting-section-title"><h2>Upcoming schedule</h2><span>{all.length} meetings</span></div>
          {all.map((m) => (
            <article className="meeting-card" key={m.id}>
              <div className="meeting-date big-date"><b>{new Date(m.date + "T00:00:00").getDate()}</b><span>{new Date(m.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}</span></div>
              <div className="meeting-info"><h3>{m.title}</h3><p>{m.time} · {m.type}</p><small>📍 {m.place}</small></div>
              {list.some((x) => x.id === m.id) && <button className="delete-meeting" onClick={() => remove(m.id)}>Delete</button>}
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
function Notes() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("pf_notes") || "[]"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  function addNote(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setNotes([...notes, { id: Date.now(), title, content }]);
    setTitle(""); setContent("");
  }
  function remove(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }
  useEffect(() => localStorage.setItem("pf_notes", JSON.stringify(notes)), [notes]);
  return (
    <>
      <div className="heading"><div><small>PERSONAL KNOWLEDGE</small><h1>My notes</h1><p>Create notes and save them in your browser.</p></div></div>
      <div className="notes">
        <form className="panel note-form" onSubmit={addNote}>
          <h2>New note</h2>
          <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Java Notes" /></label>
          <label>Content<textarea value={content} onChange={(e) => setContent(e.target.value)} rows="8" placeholder="Write anything..." /></label>
          <button className="btn primary full">Save note</button>
        </form>
        <section className="panel">
          <h2>Saved notes</h2>
          {!notes.length && <p className="muted">No notes yet.</p>}
          {notes.map((n) => (
            <article className="note" key={n.id}>
              <div><h3>{n.title}</h3><p>{n.content || "Empty note"}</p></div>
              <button onClick={() => remove(n.id)}>Delete</button>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
function Profile() {
  const defaultProfile = {
    name: "Arshpreet Saini",
    branch: "CSE",
    year: "2nd Year",
    bio: "Frontend learner building practical React projects.",
    skills: "Java, JavaScript, React, Git",
  };
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("pf_profile") || JSON.stringify(defaultProfile)));
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  function save(e) {
    e.preventDefault();
    setProfile(form);
    localStorage.setItem("pf_profile", JSON.stringify(form));
    setEdit(false);
  }
  return (
    <>
      <div className="heading">
        <div><small>ACCOUNT</small><h1>My profile</h1><p>Your student identity in PeersForge.</p></div>
        {!edit && <button className="btn primary" onClick={() => setEdit(true)}>Edit profile</button>}
      </div>
      <div className="profile-card">
        <div><h1>{profile.name}</h1><p>{profile.branch} · {profile.year}</p><p>{profile.bio}</p><div className="tags">{profile.skills.split(",").map((s) => <span key={s}>{s.trim()}</span>)}</div></div>
      </div>
      {edit && (
        <form className="panel edit-form" onSubmit={save}>
          {Object.keys(form).map((key) => (
            <label key={key}>{key}<input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></label>
          ))}
          <button className="btn primary">Save changes</button>
        </form>
      )}
    </>
  );
}
function DisabledPage({ title }) {
  return (
    <div className="empty">
      <h1>{title}</h1>
      <p>This option is kept in the UI but is disabled for this version.</p>
      <Link className="btn primary" to="/dashboard">Back to dashboard</Link>
    </div>
  );
}
function Protected() {
  return localStorage.getItem("pf_login") ? <Layout /> : <Navigate to="/login" replace />;
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/peers" element={<DisabledPage title="Find Peers" />} />
        <Route path="/resources" element={<DisabledPage title="Resource Hub" />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<DisabledPage title="404 — Page not found" />} />
    </Routes>
  );
}
