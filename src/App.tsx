import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"

type Route =
  | "dashboard"
  | "tasks"
  | "projects"
  | "project"
  | "board"
  | "calendar"
  | "team"
  | "notifications"
  | "settings"
  | "milestones"
  | "activity"
  | "dependencies"
  | "projectTasks"
  | "projectCalendar"
  | "projectTeam"
type Modal = null | "task" | "project" | "invite" | "milestone" | "search" | "create" | "confirm"
type IconName =
  | "grid" | "check" | "folder" | "calendar" | "users" | "bell" | "settings" | "search"
  | "plus" | "help" | "chevron" | "clock" | "alert" | "flag" | "more" | "menu" | "x"
  | "list" | "board" | "filter" | "arrow" | "link" | "message" | "paperclip" | "eye"
  | "briefcase" | "bolt" | "logout" | "lock" | "mail" | "layers" | "trash" | "edit"

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    folder: <path d="M3 7h7l2 2h9v10H3z M3 7V5h7l2 2"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.6 2.6-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V21h-3.6v-.2A2 2 0 0 0 9 19a2 2 0 0 0-2.2.4l-.1.1-2.6-2.6.1-.1A2 2 0 0 0 4.6 15a2 2 0 0 0-1.8-1.2H3v-3.6h.2A2 2 0 0 0 5 9a2 2 0 0 0-.4-2.2l-.1-.1 2.6-2.6.1.1A2 2 0 0 0 9 4.6a2 2 0 0 0 1.2-1.8V3h3.6v.2A2 2 0 0 0 15 5a2 2 0 0 0 2.2-.4l.1-.1 2.6 2.6-.1.1A2 2 0 0 0 19.4 9a2 2 0 0 0 1.8 1.2h.2v3.6h-.2A2 2 0 0 0 19.4 15Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 3.3 2.6c-.8.3-.8 1-.8 1.9M12 17h.01"/></>,
    chevron: <path d="m9 5 7 7-7 7"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    alert: <><path d="m12 3 10 18H2Z"/><path d="M12 9v4M12 17h.01"/></>,
    flag: <><path d="M5 21V4"/><path d="M5 5h12l-2 4 2 4H5"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    x: <path d="m6 6 12 12M18 6 6 18"/>,
    list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>,
    board: <><rect x="3" y="4" width="7" height="16" rx="1"/><rect x="14" y="4" width="7" height="10" rx="1"/></>,
    filter: <path d="M4 5h16l-6 7v5l-4 2v-7Z"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>,
    paperclip: <path d="m21 11-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7Z"/>,
    logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    layers: <path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14"/></>,
    edit: <><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const people = [
  { name: "Victory Adams", initials: "VA", role: "Project Manager", dept: "Product", projects: 5, active: 12, overdue: 2, tone: "blue" },
  { name: "John Doe", initials: "JD", role: "Backend Developer", dept: "Engineering", projects: 3, active: 8, overdue: 1, tone: "violet" },
  { name: "Mary Smith", initials: "MS", role: "UI/UX Designer", dept: "Design", projects: 2, active: 4, overdue: 0, tone: "pink" },
  { name: "David James", initials: "DJ", role: "QA Engineer", dept: "Quality Assurance", projects: 3, active: 6, overdue: 1, tone: "green" },
  { name: "Sarah Williams", initials: "SW", role: "Frontend Developer", dept: "Engineering", projects: 2, active: 7, overdue: 0, tone: "amber" },
  { name: "Michael Brown", initials: "MB", role: "DevOps Engineer", dept: "Engineering", projects: 4, active: 5, overdue: 0, tone: "cyan" },
]
const projects = [
  { name: "Fintech Mobile App", code: "FMA", desc: "Secure mobile banking and payments experience.", progress: 72, status: "Active", deadline: "Oct 20, 2026", tasks: 48, manager: "Victory", overdue: 4, tone: "indigo" },
  { name: "School Management Portal", code: "SMP", desc: "Unified administration, learning, and parent portal.", progress: 48, status: "Active", deadline: "Nov 02, 2026", tasks: 36, manager: "Sarah", overdue: 2, tone: "cyan" },
  { name: "E-commerce Platform", code: "ECP", desc: "Scalable storefront and order management platform.", progress: 91, status: "Active", deadline: "Oct 10, 2026", tasks: 52, manager: "David", overdue: 0, tone: "violet" },
  { name: "Healthcare Booking", code: "HCB", desc: "Patient scheduling and telehealth management.", progress: 22, status: "Planning", deadline: "Dec 08, 2026", tasks: 28, manager: "Victory", overdue: 0, tone: "green" },
]
const initialTasks = [
  { id: 1, title: "Build Login API", project: "Fintech Mobile App", phase: "Development", priority: "High", status: "In Progress", due: "Oct 08", assignee: "JD", progress: 40 },
  { id: 2, title: "Design onboarding screens", project: "Fintech Mobile App", phase: "UI/UX Design", priority: "Medium", status: "Review", due: "Oct 09", assignee: "MS", progress: 90 },
  { id: 3, title: "Integrate payment gateway", project: "Fintech Mobile App", phase: "Development", priority: "Critical", status: "To Do", due: "Oct 10", assignee: "SW", progress: 10 },
  { id: 4, title: "Write automated tests", project: "Fintech Mobile App", phase: "Testing / QA", priority: "High", status: "Testing", due: "Oct 12", assignee: "DJ", progress: 65 },
  { id: 5, title: "Create database schema", project: "Fintech Mobile App", phase: "Development", priority: "High", status: "Done", due: "Oct 04", assignee: "JD", progress: 100 },
  { id: 6, title: "Student attendance module", project: "School Management Portal", phase: "Development", priority: "Medium", status: "Backlog", due: "Oct 18", assignee: "SW", progress: 0 },
  { id: 7, title: "Payment API testing", project: "E-commerce Platform", phase: "Testing / QA", priority: "High", status: "Blocked", due: "Oct 06", assignee: "DJ", progress: 50 },
]
const milestones = [
  { name: "Requirements Approved", due: "Sep 12", status: "Completed", progress: 100, owner: "Victory", tasks: 8 },
  { name: "Design Complete", due: "Oct 06", status: "Completed", progress: 100, owner: "Mary", tasks: 12 },
  { name: "MVP Development Complete", due: "Oct 12", status: "In Progress", progress: 72, owner: "John", tasks: 18 },
  { name: "QA Complete", due: "Oct 16", status: "Upcoming", progress: 15, owner: "David", tasks: 7 },
  { name: "Production Launch", due: "Oct 20", status: "Upcoming", progress: 0, owner: "Michael", tasks: 3 },
]
const activities = [
  { who: "John Doe", initials: "JD", text: 'moved "Build Login API" from In Progress to Review.', time: "12 minutes ago", tone: "violet" },
  { who: "Mary Smith", initials: "MS", text: 'created "Mobile onboarding screens."', time: "38 minutes ago", tone: "pink" },
  { who: "David James", initials: "DJ", text: 'completed "Payment API testing."', time: "2 hours ago", tone: "green" },
  { who: "Victory Adams", initials: "VA", text: "changed the project deadline from Oct 18 to Oct 20.", time: "Yesterday at 4:20 PM", tone: "blue" },
]

function Avatar({ initials, tone = "blue", small = false }: { initials: string; tone?: string; small?: boolean }) {
  return <span className={`avatar avatar-${tone} ${small ? "avatar-small" : ""}`}>{initials}</span>
}
function Button({ children, onClick, variant = "primary", icon, type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; type?: "button" | "submit"; disabled?: boolean }) {
  return <button className={`btn btn-${variant}`} onClick={onClick} type={type} disabled={disabled}>{icon && <Icon name={icon} size={17}/>} {children}</button>
}
function IconButton({ icon, label, onClick, badge }: { icon: IconName; label: string; onClick?: () => void; badge?: boolean }) {
  return <button className="icon-btn" aria-label={label} title={label} onClick={onClick}><Icon name={icon}/>{badge && <i/>}</button>
}
function Badge({ children, tone }: { children: ReactNode; tone?: string }) {
  const key = tone || String(children).toLowerCase().replaceAll(" ", "-").replace("/", "")
  return <span className={`badge badge-${key}`}>{children}</span>
}
function Progress({ value }: { value: number }) {
  return <div className="progress" aria-label={`${value}% complete`}><span style={{ width: `${value}%` }}/></div>
}
function Field({ label, placeholder, type = "text", error }: { label: string; placeholder?: string; type?: string; error?: string }) {
  return <label className="field"><span>{label}</span><input type={type} placeholder={placeholder}/>{error && <small>{error}</small>}</label>
}
function SelectField({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span><select defaultValue=""><option value="" disabled>Select {label.toLowerCase()}</option>{children}</select></label>
}
function PageHead({ title, subtitle, children, breadcrumb }: { title: string; subtitle?: string; children?: ReactNode; breadcrumb?: string }) {
  return <div className="page-head"><div>{breadcrumb && <div className="breadcrumb">{breadcrumb} <Icon name="chevron" size={12}/> {title}</div>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="page-actions">{children}</div></div>
}
function EmptyState({ kind = "tasks" }: { kind?: string }) {
  return <div className="empty-state"><span><Icon name={kind === "projects" ? "folder" : kind === "notifications" ? "bell" : "check"} size={24}/></span><h3>No {kind} found</h3><p>{kind === "projects" ? "Create your first project to get started." : kind === "notifications" ? "You’re all caught up." : "Try changing your filters or create something new."}</p></div>
}

function Sidebar({ route, go, collapsed, setCollapsed }: { route: Route; go: (r: Route) => void; collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const nav: { id: Route; label: string; icon: IconName; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "grid" }, { id: "tasks", label: "My Tasks", icon: "check", badge: "6" },
    { id: "projects", label: "Projects", icon: "folder" }, { id: "calendar", label: "Calendar", icon: "calendar" },
    { id: "team", label: "Team", icon: "users" }, { id: "notifications", label: "Notifications", icon: "bell", badge: "4" },
  ]
  const projectRoutes = ["project","projectTasks","board","dependencies","projectCalendar","milestones","projectTeam","activity"]
  return <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
    <div className="brand"><span className="brand-mark"><span/><span/><span/></span>{!collapsed && <div><strong>FlowProject</strong><small>Plan. Execute. Deliver.</small></div>}</div>
    <button className="workspace"><span className="workspace-icon">A</span>{!collapsed && <><span><strong>Acme Software</strong><small>Company workspace</small></span><Icon name="chevron" size={14}/></>}</button>
    <nav>{nav.map(item => <button key={item.id} className={route === item.id || (item.id === "projects" && projectRoutes.includes(route)) ? "active" : ""} onClick={() => go(item.id)}><Icon name={item.icon}/>{!collapsed && <><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</>}</button>)}</nav>
    <div className="sidebar-bottom">
      <button className={route === "settings" ? "active" : ""} onClick={() => go("settings")}><Icon name="settings"/>{!collapsed && <span>Settings</span>}</button>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}><Icon name="arrow"/>{!collapsed && <span>Collapse sidebar</span>}</button>
      <div className="sidebar-profile"><Avatar initials="VA" small/>{!collapsed && <span><strong>Victory Adams</strong><small>Project Manager</small></span>} {!collapsed && <Icon name="more"/>}</div>
    </div>
  </aside>
}

function Topbar({ onMenu, onSearch, onNotify, onCreate }: { onMenu: () => void; onSearch: () => void; onNotify: () => void; onCreate: () => void }) {
  return <header className="topbar"><IconButton icon="menu" label="Open menu" onClick={onMenu}/><button className="search-trigger" onClick={onSearch}><Icon name="search"/><span>Search projects, tasks, people...</span><kbd>⌘ K</kbd></button><div className="topbar-actions"><Button variant="secondary" icon="plus" onClick={onCreate}>Create</Button><IconButton icon="help" label="Help"/><IconButton icon="bell" label="Notifications" onClick={onNotify} badge/><Avatar initials="VA" small/></div></header>
}

function Dashboard({ go, open }: { go: (r: Route) => void; open: (m: Modal) => void }) {
  const stats = [
    ["Total Projects", "8", "2 planned", "folder", "blue"], ["Active Projects", "5", "Across 3 teams", "bolt", "green"],
    ["Overdue Tasks", "6", "2 need your action", "alert", "red"], ["Upcoming Milestones", "4", "Next in 3 days", "flag", "amber"], ["My Tasks", "12", "5 due this week", "check", "violet"],
  ] as const
  return <div>
    <PageHead title="Good morning, Victory" subtitle="Here’s what’s happening across your projects."><Button variant="secondary" icon="plus" onClick={() => open("task")}>Create Task</Button><Button icon="plus" onClick={() => open("project")}>Create Project</Button></PageHead>
    <div className="summary-grid">{stats.map(([label,value,note,icon,tone]) => <article className="summary-card" key={label}><div className={`stat-icon ${tone}`}><Icon name={icon as IconName}/></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></article>)}</div>
    <div className="dashboard-grid">
      <div className="main-column">
        <section className="card">
          <div className="section-head"><div><h2>Project overview</h2><p>Progress and delivery status for active projects</p></div><Button variant="ghost" onClick={() => go("projects")}>View all <Icon name="arrow" size={14}/></Button></div>
          <div className="table-wrap"><table><thead><tr><th>Project</th><th>Progress</th><th>Status</th><th>Deadline</th><th>Tasks</th><th>Manager</th></tr></thead><tbody>{projects.slice(0,3).map(p => <tr key={p.name} onClick={() => go("project")} className="clickable"><td><div className="project-cell"><span className={`project-icon ${p.tone}`}>{p.code}</span><strong>{p.name}</strong></div></td><td><div className="progress-cell"><Progress value={p.progress}/><b>{p.progress}%</b></div></td><td><Badge>{p.status}</Badge></td><td><span className={p.name.includes("commerce") ? "due danger-text" : "due"}><Icon name="calendar" size={14}/>{p.deadline}</span></td><td>{p.tasks}</td><td><div className="person-cell"><Avatar initials={p.manager.slice(0,2).toUpperCase()} small/>{p.manager}</div></td></tr>)}</tbody></table></div>
        </section>
        <section className="card">
          <div className="section-head"><div><h2>My tasks</h2><p>Your assigned work across all projects</p></div><Button variant="ghost" onClick={() => go("tasks")}>View all <Icon name="arrow" size={14}/></Button></div>
          <div className="tabs compact"><button className="active">All <b>12</b></button><button>Today <b>3</b></button><button>Upcoming</button><button>Overdue <b className="red-count">2</b></button><button>Blocked <b>1</b></button></div>
          <div className="task-list">{initialTasks.slice(0,4).map(t => <button className="task-row" key={t.id} onClick={() => open("task")}><span className="task-check"/><span className="task-name"><strong>{t.title}</strong><small>{t.project} · {t.phase}</small></span><Badge>{t.priority}</Badge><Badge>{t.status}</Badge><span className="due"><Icon name="clock" size={14}/>{t.due}</span><Avatar initials={t.assignee} small/></button>)}</div>
        </section>
      </div>
      <div className="side-column">
        <section className="card deadlines"><div className="section-head"><div><h2>Upcoming deadlines</h2><p>Next 14 days</p></div><IconButton icon="more" label="More"/></div>{[["08","OCT","API Integration","Fintech Mobile App"],["10","OCT","Mobile App MVP","Fintech Mobile App"],["14","OCT","QA Complete","E-commerce Platform"],["20","OCT","Fintech App Delivery","Fintech Mobile App"]].map((d,i) => <button key={d[2]} onClick={() => open("task")}><span className={`date-block ${i === 0 ? "urgent" : ""}`}><strong>{d[0]}</strong><small>{d[1]}</small></span><span><strong>{d[2]}</strong><small>{d[3]}</small></span><Icon name="arrow" size={14}/></button>)}</section>
        <section className="card activity-card"><div className="section-head"><div><h2>Recent activity</h2><p>Latest team updates</p></div></div>{activities.slice(0,4).map(a => <div className="activity-item" key={a.time}><Avatar initials={a.initials} tone={a.tone} small/><div><p><strong>{a.who}</strong> {a.text}</p><small>{a.time}</small></div></div>)}</section>
      </div>
    </div>
  </div>
}

function Projects({ go, open }: { go: (r: Route) => void; open: (m: Modal) => void }) {
  const [view, setView] = useState<"cards"|"list">("cards")
  return <div><PageHead title="Projects" subtitle="Plan, monitor, and deliver work across your organization."><Button icon="plus" onClick={() => open("project")}>Create Project</Button></PageHead>
    <div className="toolbar"><div className="tabs filter-tabs"><button className="active">All <b>8</b></button><button>Active <b>5</b></button><button>Planning</button><button>On Hold</button><button>Completed</button></div><div className="toolbar-right"><label className="small-search"><Icon name="search"/><input placeholder="Search projects"/></label><div className="view-toggle"><IconButton icon="board" label="Card view" onClick={() => setView("cards")}/><IconButton icon="list" label="List view" onClick={() => setView("list")}/></div></div></div>
    {view === "cards" ? <div className="project-grid">{projects.map(p => <article className="project-card" key={p.name} onClick={() => go("project")}><div className="project-card-head"><span className={`project-icon large ${p.tone}`}>{p.code}</span><IconButton icon="more" label="More"/></div><div><h3>{p.name}</h3><p>{p.desc}</p></div><div className="project-meta"><span><Icon name="calendar" size={15}/> {p.deadline}</span><Badge>{p.status}</Badge></div><div className="project-progress"><span><strong>{p.progress}%</strong> complete</span><Progress value={p.progress}/></div><div className="project-foot"><div className="avatar-stack">{people.slice(0,4).map(u => <Avatar key={u.initials} initials={u.initials} tone={u.tone} small/>)}</div><span>{p.tasks} tasks</span>{p.overdue > 0 && <span className="danger-text">{p.overdue} overdue</span>}</div></article>)}</div> : <section className="card table-wrap"><table><thead><tr><th>Project</th><th>Status</th><th>Manager</th><th>Progress</th><th>Deadline</th><th>Tasks</th></tr></thead><tbody>{projects.map(p => <tr key={p.name} onClick={() => go("project")} className="clickable"><td><div className="project-cell"><span className={`project-icon ${p.tone}`}>{p.code}</span><strong>{p.name}</strong></div></td><td><Badge>{p.status}</Badge></td><td>{p.manager}</td><td><div className="progress-cell"><Progress value={p.progress}/><b>{p.progress}%</b></div></td><td>{p.deadline}</td><td>{p.tasks}</td></tr>)}</tbody></table></section>}
  </div>
}

function ProjectNav({ route, go }: { route: Route; go: (r: Route) => void }) {
  const nav: [Route,string][] = [["project","Overview"],["projectTasks","Tasks"],["board","Board"],["dependencies","Timeline"],["projectCalendar","Calendar"],["milestones","Milestones"],["projectTeam","Team"],["activity","Activity"]]
  return <div className="project-tabs">{nav.map(([r,label]) => <button key={label} className={route === r ? "active" : ""} onClick={() => go(r)}>{label}</button>)}</div>
}
function ProjectHeader({ route, go }: { route: Route; go: (r: Route) => void }) {
  return <><div className="project-head"><button className="back-link" onClick={() => go("projects")}><Icon name="arrow" size={14}/> Projects</button><div className="project-title-row"><span className="project-icon large indigo">FMA</span><div><div><h1>Fintech Mobile App</h1><Badge>Active</Badge></div><p>Secure mobile banking and payments experience · <strong>Victory Adams</strong></p></div><div className="page-actions"><Button variant="secondary" icon="edit">Edit project</Button><IconButton icon="more" label="More"/></div></div></div><ProjectNav route={route} go={go}/></>
}
function ProjectOverview({ go }: { go: (r: Route) => void }) {
  const phases = [["Discovery","done"],["Requirements","done"],["UI/UX","done"],["Development","current"],["QA",""],["UAT",""],["Deployment",""]]
  return <div><ProjectHeader route="project" go={go}/><div className="project-overview-grid"><div className="main-column">
    <section className="card project-health"><div className="section-head"><div><h2>Project status</h2><p>Overall delivery health</p></div><Badge tone="on-track">On track</Badge></div><div className="health-top"><div className="progress-ring"><span>72<small>%</small></span></div><div className="health-copy"><strong>34 of 48 tasks completed</strong><p>The team is progressing well. Development is the current focus.</p><Progress value={72}/></div></div><div className="health-stats"><div><strong>34</strong><span>Completed</span></div><div><strong>8</strong><span>In progress</span></div><div className="danger-text"><strong>4</strong><span>Overdue</span></div><div className="warning-text"><strong>2</strong><span>Blocked</span></div></div></section>
    <section className="card"><div className="section-head"><div><h2>Project lifecycle</h2><p>Software development lifecycle</p></div><Button variant="ghost">Manage phases</Button></div><div className="phase-track">{phases.map(([name,state],i) => <div className={`phase ${state}`} key={name}><span>{state === "done" ? <Icon name="check" size={14}/> : i+1}</span><strong>{name}</strong><small>{state === "done" ? "Completed" : state === "current" ? "80% complete" : "Not started"}</small></div>)}</div><div className="current-phase"><div className="stat-icon violet"><Icon name="layers"/></div><div><span>Current phase</span><strong>Development</strong><small>Sep 20 – Oct 12 · John Doe</small></div><div><strong>80%</strong><Progress value={80}/></div></div></section>
    <section className="card"><div className="section-head"><div><h2>Recent activity</h2><p>Updates in this project</p></div><Button variant="ghost" onClick={() => go("activity")}>View all</Button></div>{activities.map(a => <div className="activity-item large" key={a.time}><Avatar initials={a.initials} tone={a.tone}/><div><p><strong>{a.who}</strong> {a.text}</p><small>{a.time}</small></div></div>)}</section>
  </div><div className="side-column">
    <section className="card timeline-card"><div className="section-head"><div><h2>Timeline</h2></div></div><div className="timeline-dates"><div><small>START DATE</small><strong>Sep 01, 2026</strong></div><Icon name="arrow"/><div><small>DEADLINE</small><strong>Oct 20, 2026</strong></div></div><div className="days-left"><Icon name="clock"/><div><strong>18 days remaining</strong><span>62% of schedule elapsed</span></div></div></section>
    <section className="card"><div className="section-head"><div><h2>Upcoming milestones</h2><p>Next deliverables</p></div><Button variant="ghost" onClick={() => go("milestones")}>View</Button></div>{milestones.slice(2).map(m => <button className="milestone-row" key={m.name} onClick={() => go("milestones")}><span className="milestone-dot"/><span><strong>{m.name}</strong><small>{m.due} · {m.owner}</small></span><Icon name="arrow" size={14}/></button>)}</section>
    <section className="card"><div className="section-head"><div><h2>Project team</h2><p>6 active members</p></div><Button variant="ghost" onClick={() => go("team")}>Manage</Button></div>{people.slice(0,5).map(p => <div className="team-mini" key={p.name}><Avatar initials={p.initials} tone={p.tone} small/><span><strong>{p.name}</strong><small>{p.role}</small></span></div>)}</section>
  </div></div></div>
}

function Tasks({ open, projectMode = false, go }: { open: (m: Modal) => void; projectMode?: boolean; go?: (r: Route) => void }) {
  const [filter, setFilter] = useState("All")
  const visible = filter === "All" ? initialTasks : initialTasks.filter(t => t.status === filter || (filter === "Overdue" && t.id === 7))
  return <div>{projectMode && go && <ProjectHeader route="projectTasks" go={go}/>} {!projectMode && <PageHead title="My Tasks" subtitle="Stay focused on work assigned to you."><Button icon="plus" onClick={() => open("task")}>Create Task</Button></PageHead>}
    <div className="tabs page-tabs">{["All","Today","Upcoming","Overdue","Blocked","Completed"].map(f => <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}{f === "All" && <b>12</b>}{f === "Overdue" && <b className="red-count">2</b>}</button>)}</div>
    <section className="card task-table-card"><div className="toolbar"><label className="small-search wide"><Icon name="search"/><input placeholder="Search tasks"/></label><div className="toolbar-right"><Button variant="secondary" icon="filter">Filter</Button><Button variant="secondary" icon="list">Sort</Button></div></div>
      {visible.length ? <div className="table-wrap"><table className="task-table"><thead><tr><th><input type="checkbox" aria-label="Select all"/></th><th>Task</th><th>Project</th><th>Phase</th><th>Priority</th><th>Status</th><th>Due date</th><th>Assignee</th></tr></thead><tbody>{visible.map(t => <tr key={t.id} className="clickable" onClick={() => open("task")}><td><input type="checkbox" aria-label={`Select ${t.title}`} onClick={e => e.stopPropagation()}/></td><td><strong>{t.title}</strong></td><td>{t.project}</td><td>{t.phase}</td><td><Badge>{t.priority}</Badge></td><td><Badge>{t.status}</Badge></td><td className={t.id === 7 ? "danger-text" : ""}>{t.due}, 2026</td><td><Avatar initials={t.assignee} small/></td></tr>)}</tbody></table></div> : <EmptyState/>}
    </section>
  </div>
}

function Board({ go, open }: { go: (r: Route) => void; open: (m: Modal) => void }) {
  const columns = ["Backlog","To Do","In Progress","Review","Testing","Done"]
  const [tasks, setTasks] = useState(initialTasks)
  const move = (id: number, status: string) => setTasks(ts => ts.map(t => t.id === id ? {...t,status} : t))
  return <div><ProjectHeader route="board" go={go}/><div className="board-toolbar"><div><h2>Kanban board</h2><p>Drag tasks between columns to update status.</p></div><div className="filter-pills"><Button variant="secondary">Assignee</Button><Button variant="secondary">Priority</Button><Button variant="secondary">Phase</Button><Button icon="plus" onClick={() => open("task")}>Create task</Button></div></div>
    <div className="kanban">{columns.map(col => { const items=tasks.filter(t=>t.status===col); return <section className="kanban-col" key={col} onDragOver={e=>e.preventDefault()} onDrop={e=>move(Number(e.dataTransfer.getData("task")),col)}><div className="kanban-head"><span className={`status-dot ${col.toLowerCase().replaceAll(" ","-")}`}/><strong>{col.toUpperCase()}</strong><b>{items.length}</b><IconButton icon="plus" label={`Add to ${col}`}/></div><div className="kanban-list">{items.map(t => <article className="kanban-card" key={t.id} draggable onDragStart={e=>e.dataTransfer.setData("task",String(t.id))} onClick={() => open("task")}><div className="kanban-card-top"><Badge>{t.priority}</Badge><Icon name="more"/></div><h3>{t.title}</h3><p>{t.project} · {t.phase}</p><div className="mini-progress"><Progress value={t.progress}/><small>{Math.round(t.progress/20)}/5</small></div><div className="kanban-foot"><Avatar initials={t.assignee} small/><span className={t.id===7 ? "danger-text" : ""}><Icon name="calendar" size={13}/>{t.due}</span><span><Icon name="message" size={13}/>{t.id+1}</span></div></article>)}{!items.length && <div className="empty-column"><Icon name="plus"/><span>Drop tasks here</span></div>}</div></section>})}</div>
  </div>
}

function Calendar({ go, open }: { go?: (r: Route) => void; open: (m: Modal) => void }) {
  const [view,setView]=useState("Month")
  const days = Array.from({length:35},(_,i)=>i<3 ? 28+i : i-2)
  const events: Record<number,[string,string][]> = {8:[["API Integration","task"]],10:[["Mobile App MVP","deadline"]],12:[["MVP Development Complete","milestone"]],16:[["QA Complete","milestone"]],20:[["Fintech App Delivery","deadline"]],22:[["Automated tests","task"]]}
  return <div>{go && <ProjectHeader route="projectCalendar" go={go}/>} {!go && <PageHead title="Calendar" subtitle="Tasks, milestones, and deadlines in one place."><Button icon="plus" onClick={() => open("task")}>Add event</Button></PageHead>}
    <section className="card calendar-card"><div className="calendar-toolbar"><div><Button variant="secondary">Today</Button><IconButton icon="arrow" label="Previous"/><IconButton icon="arrow" label="Next"/><h2>October 2026</h2></div><div className="view-switch">{["Month","Week","Day"].map(v=><button key={v} className={view===v?"active":""} onClick={()=>setView(v)}>{v}</button>)}</div></div><div className="calendar-legend"><span><i className="task"/> Task</span><span><i className="milestone"/> Milestone</span><span><i className="deadline"/> Deadline</span></div><div className="calendar-grid">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d=><div className="weekday" key={d}>{d}</div>)}{days.map((d,i)=><div className={`day ${i<3?"muted":""} ${d===8&&i>3?"today":""}`} key={i}><span>{d}</span>{i>3 && events[d]?.map(([name,type])=><button className={`cal-event ${type}`} key={name} onClick={()=>open("task")}><i/>{name}</button>)}</div>)}</div></section>
  </div>
}

function Team({ go, open, projectMode=false }: { go: (r: Route) => void; open: (m: Modal) => void; projectMode?: boolean }) {
  const [selected,setSelected]=useState<typeof people[number]|null>(null)
  return <div>{projectMode && <ProjectHeader route="projectTeam" go={go}/>} {!projectMode && <PageHead title="Team" subtitle="Manage people, workload, and project access."><Button icon="plus" onClick={() => open("invite")}>Invite Member</Button></PageHead>}
    <section className="card team-card"><div className="toolbar"><label className="small-search wide"><Icon name="search"/><input placeholder="Search team members"/></label><div className="toolbar-right"><Button variant="secondary" icon="filter">Department</Button><Button variant="secondary" icon="filter">Role</Button><Button variant="secondary" icon="filter">Project</Button></div></div><div className="table-wrap"><table><thead><tr><th>Member</th><th>Role</th><th>Department</th><th>Projects</th><th>Active tasks</th><th>Overdue</th><th>Status</th></tr></thead><tbody>{people.map(p=><tr key={p.name} className="clickable" onClick={()=>setSelected(p)}><td><div className="person-cell"><Avatar initials={p.initials} tone={p.tone}/><span><strong>{p.name}</strong><small>{p.name.toLowerCase().replace(" ",".")}@acme.dev</small></span></div></td><td>{p.role}</td><td>{p.dept}</td><td>{p.projects} Projects</td><td>{p.active}</td><td className={p.overdue?"danger-text":""}>{p.overdue}</td><td><Badge tone="active">Active</Badge></td></tr>)}</tbody></table></div></section>
    {selected && <div className="drawer-backdrop" onClick={()=>setSelected(null)}><aside className="drawer member-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div/><IconButton icon="x" label="Close" onClick={()=>setSelected(null)}/></div><div className="member-hero"><Avatar initials={selected.initials} tone={selected.tone}/><h2>{selected.name}</h2><p>{selected.role} · {selected.dept}</p><Badge tone="active">Active</Badge></div><div className="member-stats"><div><strong>31</strong><span>Completed</span></div><div><strong>{selected.active}</strong><span>In progress</span></div><div><strong>{selected.overdue}</strong><span>Overdue</span></div><div><strong>0</strong><span>Blocked</span></div></div><div className="tabs compact"><button className="active">Profile</button><button>Projects</button><button>Tasks</button><button>Activity</button></div><div className="drawer-section"><h3>Active projects</h3>{projects.slice(0,2).map(p=><div className="simple-row" key={p.name}><span className={`project-icon ${p.tone}`}>{p.code}</span><span><strong>{p.name}</strong><small>{p.progress}% complete</small></span><Progress value={p.progress}/></div>)}</div><div className="drawer-section"><h3>Assigned tasks</h3>{initialTasks.slice(0,3).map(t=><button className="simple-row" key={t.id} onClick={()=>open("task")}><span className="task-check"/><span><strong>{t.title}</strong><small>{t.project}</small></span><Badge>{t.status}</Badge></button>)}</div></aside></div>}
  </div>
}

function Milestones({ go, open }: { go: (r: Route) => void; open: (m: Modal) => void }) {
  return <div><ProjectHeader route="milestones" go={go}/><div className="subpage-head"><div><h2>Milestones</h2><p>Track key project delivery points.</p></div><Button icon="plus" onClick={()=>open("milestone")}>Create milestone</Button></div><div className="milestone-grid">{milestones.map(m=><article className="card milestone-card" key={m.name}><div className="milestone-card-top"><span className={`milestone-symbol ${m.status.toLowerCase().replace(" ","-")}`}><Icon name={m.status==="Completed"?"check":"flag"}/></span><Badge>{m.status}</Badge></div><h3>{m.name}</h3><p>Critical delivery checkpoint for the Fintech Mobile App.</p><div className="milestone-details"><span><Icon name="calendar"/>Due {m.due}, 2026</span><span><Avatar initials={m.owner.slice(0,2).toUpperCase()} small/>{m.owner}</span></div><div className="project-progress"><span><strong>{m.progress}%</strong> · {m.tasks} linked tasks</span><Progress value={m.progress}/></div></article>)}</div></div>
}
function Activity({ go }: { go:(r:Route)=>void }) {
  return <div><ProjectHeader route="activity" go={go}/><div className="subpage-head"><div><h2>Activity</h2><p>A complete history of project changes.</p></div><div className="filter-pills"><Button variant="secondary">All</Button><Button variant="ghost">Tasks</Button><Button variant="ghost">Team</Button><Button variant="ghost">Milestones</Button></div></div><section className="card activity-timeline">{[...activities,...activities].map((a,i)=><div className="timeline-activity" key={i}><span className="timeline-line"/><Avatar initials={a.initials} tone={a.tone}/><div><p><strong>{a.who}</strong> {a.text}</p><small>{i>3?"Sep 30, 2026":a.time}</small></div></div>)}</section></div>
}
function Dependencies({ go, open }: { go:(r:Route)=>void; open:(m:Modal)=>void }) {
  const flow=["Database Schema","Backend API","API Integration","Frontend Development","QA Testing","UAT","Deployment"]
  return <div><ProjectHeader route="dependencies" go={go}/><div className="subpage-head"><div><h2>Task dependencies</h2><p>Understand sequencing and blocked work.</p></div><Button variant="secondary" icon="list">List view</Button></div><section className="card dependency-canvas"><div className="dependency-flow">{flow.map((name,i)=><div className="dependency-wrap" key={name}><button className={`dependency-node ${i===3?"blocked":""}`} onClick={()=>open("task")}><span><Icon name={i<2?"check":i===3?"alert":"clock"}/></span><strong>{name}</strong><small>{i<2?"Completed":i===3?"Blocked":"Due Oct "+(8+i*2)}</small><div><Avatar initials={people[i%people.length].initials} tone={people[i%people.length].tone} small/><Badge>{i<2?"Done":i===3?"Blocked":"To Do"}</Badge></div></button>{i<flow.length-1&&<span className="dependency-arrow"><Icon name="arrow"/></span>}</div>)}</div></section><section className="card table-wrap"><table><thead><tr><th>Task</th><th>Depends on</th><th>Blocks</th><th>Status</th></tr></thead><tbody>{flow.slice(1,6).map((n,i)=><tr key={n}><td><strong>{n}</strong></td><td>{flow[i]}</td><td>{flow[i+2]}</td><td><Badge>{i===2?"Blocked":"To Do"}</Badge></td></tr>)}</tbody></table></section></div>
}

function Notifications({ open }: { open:(m:Modal)=>void }) {
  const [unread,setUnread]=useState([true,true,true,false,false])
  const notes=[["You were assigned to Build Login API.","John Doe assigned this task to you.","5 min"],["Payment API is overdue.","The task was due yesterday in E-commerce Platform.","1 hour"],["Database Design has been completed.","John completed a task that blocks your work.","3 hours"],["You were mentioned by Mary.","“Victory, can you review the latest onboarding flow?”","Yesterday"],["Production Launch milestone is due in 3 days.","Fintech Mobile App · Oct 20","Yesterday"]]
  return <div><PageHead title="Notifications" subtitle="Stay up to date on work that needs your attention."><Button variant="secondary" onClick={()=>setUnread(unread.map(()=>false))}>Mark all as read</Button></PageHead><div className="tabs page-tabs"><button className="active">All <b>5</b></button><button>Unread <b>3</b></button><button>Mentions</button><button>Tasks</button><button>Projects</button></div><section className="card notifications">{notes.map((n,i)=><button key={n[0]} className={unread[i]?"unread":""} onClick={()=>{setUnread(u=>u.map((x,j)=>j===i?false:x));open("task")}}><span className="note-icon"><Icon name={i===1?"alert":i===3?"message":i===4?"flag":"check"}/></span><span><strong>{n[0]}</strong><small>{n[1]}</small></span><time>{n[2]}</time><IconButton icon="more" label="Notification actions"/></button>)}</section></div>
}
function Settings() {
  const [toggles,setToggles]=useState([true,true,true,true,true,false])
  return <div><PageHead title="Settings" subtitle="Manage your profile, organization, and preferences."/><div className="settings-layout"><aside className="settings-nav">{["Profile","Account","Notifications","Organization","Security"].map((s,i)=><button className={i===0?"active":""} key={s}><Icon name={["users","settings","bell","briefcase","lock"][i] as IconName}/>{s}</button>)}</aside><div className="settings-content"><section className="card settings-section"><div><h2>Profile</h2><p>Update your personal information and how others see you.</p></div><div className="profile-photo"><Avatar initials="VA"/><Button variant="secondary">Change photo</Button><Button variant="ghost">Remove</Button></div><div className="form-grid"><Field label="Full name" placeholder="Victory Adams"/><Field label="Email address" placeholder="victory@acme.dev"/><Field label="Job title" placeholder="Senior Project Manager"/><Field label="Department" placeholder="Product"/><SelectField label="Time zone"><option>West Africa Time (WAT)</option></SelectField></div><div className="form-actions"><Button>Save changes</Button></div></section><section className="card settings-section"><div><h2>Notification preferences</h2><p>Choose which updates you want to receive.</p></div>{["Task assignments","Task mentions","Deadline reminders","Overdue tasks","Milestone reminders","Project updates"].map((label,i)=><div className="toggle-row" key={label}><span><strong>{label}</strong><small>Receive notifications about {label.toLowerCase()}.</small></span><button className={`toggle ${toggles[i]?"on":""}`} onClick={()=>setToggles(t=>t.map((v,j)=>j===i?!v:v))}><span/></button></div>)}</section></div></div></div>
}

function ModalLayer({ modal, close, go }: { modal: Modal; close:()=>void; go:(r:Route)=>void }) {
  const [tab,setTab]=useState("Overview")
  if (!modal) return null
  if (modal==="task") return <div className="drawer-backdrop" onClick={close}><aside className="drawer task-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div className="breadcrumb">FMA-24 <Icon name="chevron" size={11}/> Development</div><div><IconButton icon="more" label="More"/><IconButton icon="x" label="Close" onClick={close}/></div></div><div className="task-title"><span className="task-check large"/><div><h2>Build Login API</h2><p>Create secure authentication endpoints for the mobile application.</p></div></div><div className="task-properties"><div><small>STATUS</small><Badge>In Progress</Badge></div><div><small>PRIORITY</small><Badge>High</Badge></div><div><small>ASSIGNEE</small><span><Avatar initials="JD" tone="violet" small/>John Doe</span></div><div><small>DUE DATE</small><span className="danger-text"><Icon name="calendar" size={14}/>Oct 08, 2026</span></div></div><div className="tabs compact drawer-tabs">{["Overview","Subtasks","Dependencies","Comments","Activity"].map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</button>)}</div>
    {tab==="Overview"&&<><div className="drawer-section"><h3>Description</h3><p>Build the login API with secure credential validation, JWT token generation, comprehensive error handling, and automated test coverage.</p></div><div className="drawer-section"><div className="section-head"><div><h3>Subtasks</h3><p>2 of 5 completed</p></div><Button variant="ghost" icon="plus">Add subtask</Button></div><Progress value={40}/>{["Create endpoint","Validate credentials","Generate JWT token","Handle errors","Write tests"].map((s,i)=><button className="subtask" key={s}><span className={`task-check ${i<2?"checked":""}`}>{i<2&&<Icon name="check" size={12}/>}</span><span className={i<2?"done-text":""}>{s}</span><Avatar initials={i<2?"JD":"VA"} small/><Icon name="more"/></button>)}</div><div className="drawer-section dependency-box"><h3>Dependencies</h3><button><span><small>DEPENDS ON</small><strong>Database Schema</strong></span><Badge>Done</Badge></button><button onClick={()=>{close();go("dependencies")}}><span><small>BLOCKS</small><strong>Frontend Login Integration</strong></span><Badge>To Do</Badge></button></div><div className="drawer-section"><h3>Comments</h3><div className="comment"><Avatar initials="VA" small/><div><strong>Victory Adams <small>2h ago</small></strong><p>Please make sure refresh token handling is included before moving this to review.</p></div></div><label className="comment-box"><Avatar initials="VA" small/><input placeholder="Write a comment..."/><IconButton icon="paperclip" label="Attach file"/><Button>Send</Button></label></div></>}
    {tab!=="Overview"&&<div className="drawer-section"><EmptyState kind={tab.toLowerCase()}/></div>}
  </aside></div>
  if (modal==="search") return <div className="modal-backdrop" onClick={close}><section className="search-modal" onClick={e=>e.stopPropagation()}><label><Icon name="search"/><input autoFocus placeholder="Search projects, tasks, people, milestones..."/><kbd>ESC</kbd></label><div className="search-group"><small>RECENT SEARCHES</small>{[["Build Login API","Task","check"],["Fintech Mobile App","Project","folder"],["John Doe","Team member","users"],["MVP Development Complete","Milestone","flag"]].map(r=><button key={r[0]} onClick={()=>{close();r[1]==="Project"?go("project"):r[1]==="Team member"?go("team"):undefined}}><span><Icon name={r[2] as IconName}/></span><span><strong>{r[0]}</strong><small>{r[1]}</small></span><Icon name="arrow"/></button>)}</div><footer><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>ESC</kbd> Close</span></footer></section></div>
  if (modal==="create") return <div className="modal-backdrop" onClick={close}><section className="create-menu" onClick={e=>e.stopPropagation()}><div><strong>Create new</strong><IconButton icon="x" label="Close" onClick={close}/></div>{[["project","New Project","Set up a project and lifecycle"],["task","New Task","Add work and assign an owner"],["milestone","New Milestone","Create a delivery checkpoint"],["invite","Invite Team Member","Add someone to your workspace"]].map(([id,title,desc])=><button key={id} onClick={()=>close()}><span><Icon name={id==="project"?"folder":id==="task"?"check":id==="milestone"?"flag":"users"}/></span><span><strong>{title}</strong><small>{desc}</small></span><Icon name="arrow"/></button>)}</section></div>
  const config = modal==="project" ? {title:"Create a project",subtitle:"Set up a project, timeline, and delivery lifecycle."} : modal==="invite" ? {title:"Invite team member",subtitle:"Invite someone to collaborate in your workspace."} : modal==="milestone" ? {title:"Create milestone",subtitle:"Add a key project delivery checkpoint."} : {title:"Create a task",subtitle:"Add work, assign ownership, and set a deadline."}
  return <div className="modal-backdrop" onClick={close}><form className="form-modal" onClick={e=>e.stopPropagation()} onSubmit={(e:FormEvent)=>{e.preventDefault();close();if(modal==="project")go("project")}}><div className="modal-head"><div><h2>{config.title}</h2><p>{config.subtitle}</p></div><IconButton icon="x" label="Close" onClick={close}/></div><div className="modal-body">
    {modal==="project"&&<><div className="form-grid"><Field label="Project name" placeholder="e.g. Customer mobile app"/><Field label="Project code" placeholder="e.g. CMA"/><label className="field full"><span>Description</span><textarea placeholder="What are you building?"/></label><SelectField label="Project manager"><option>Victory Adams</option></SelectField><Field label="Client" placeholder="Internal"/><SelectField label="Category"><option>Software development</option></SelectField><Field label="Start date" type="date"/><Field label="Target completion date" type="date"/></div><div className="lifecycle-preview"><div><strong>Software Development Lifecycle</strong><small>7 phases will be created</small></div><div>{["Discovery","Requirements","UI/UX Design","Development","Testing / QA","UAT","Deployment"].map((p,i)=><span key={p}><b>{i+1}</b>{p}</span>)}</div></div></>}
    {modal==="task"&&<div className="form-grid"><Field label="Task title" placeholder="What needs to be done?"/><SelectField label="Project"><option>Fintech Mobile App</option></SelectField><label className="field full"><span>Description</span><textarea placeholder="Add details, acceptance criteria, or context..."/></label><SelectField label="Phase"><option>Development</option></SelectField><SelectField label="Assignee"><option>John Doe</option></SelectField><SelectField label="Priority"><option>High</option><option>Critical</option></SelectField><SelectField label="Status"><option>To Do</option><option>In Progress</option></SelectField><Field label="Start date" type="date"/><Field label="Due date" type="date"/><Field label="Estimated hours" placeholder="8"/><SelectField label="Milestone"><option>MVP Development Complete</option></SelectField></div>}
    {modal==="invite"&&<div className="form-grid one"><Field label="Full name" placeholder="e.g. Alex Morgan"/><Field label="Work email" type="email" placeholder="alex@company.com"/><SelectField label="Role"><option>Team Member</option><option>Project Manager</option><option>Team Lead</option><option>Administrator</option></SelectField></div>}
    {modal==="milestone"&&<div className="form-grid"><Field label="Milestone name" placeholder="e.g. Beta release"/><SelectField label="Project"><option>Fintech Mobile App</option></SelectField><label className="field full"><span>Description</span><textarea placeholder="Describe this delivery point..."/></label><SelectField label="Phase"><option>Development</option></SelectField><SelectField label="Owner"><option>Victory Adams</option></SelectField><Field label="Due date" type="date"/></div>}
  </div><div className="modal-actions"><Button variant="secondary" onClick={close}>Cancel</Button><Button type="submit">{modal==="invite"?"Send invitation":modal==="project"?"Create project":modal==="milestone"?"Create milestone":"Create task"}</Button></div></form></div>
}

function Auth({ onLogin }: { onLogin:()=>void }) {
  const [screen,setScreen]=useState<"login"|"register"|"forgot"|"verify"|"onboarding">("login")
  const [step,setStep]=useState(1)
  if(screen==="onboarding") return <main className="onboarding"><div className="onboarding-brand"><span className="brand-mark"><span/><span/><span/></span><strong>FlowProject</strong></div><div className="onboard-shell"><div className="onboard-progress"><span>STEP {step} OF 5</span><Progress value={step*20}/></div><div className="onboard-content">{step===1&&<><h1>Tell us about your organization</h1><p>This helps us personalize your workspace.</p><Field label="Organization name" placeholder="Acme Software"/><SelectField label="Company size"><option>11–50 people</option></SelectField></>}{step===2&&<><h1>What’s your role?</h1><p>Choose the option that best describes your work.</p><div className="role-grid">{["Project Manager","Team Lead","Developer","Designer","QA Engineer","Administrator","Other"].map(r=><button key={r}><Icon name="briefcase"/>{r}</button>)}</div></>}{step===3&&<><h1>Create your first project</h1><p>You can change these details later.</p><Field label="Project name" placeholder="Fintech Mobile App"/><Field label="Target deadline" type="date"/></>}{step===4&&<><h1>Invite your team</h1><p>Great projects start with the right people.</p><Field label="Team member email" placeholder="name@company.com"/><Button variant="secondary" icon="plus">Add another</Button></>}{step===5&&<><h1>Choose a lifecycle</h1><p>Start with a proven process for software delivery.</p><button className="template-card active"><Icon name="layers"/><span><strong>Software Development Lifecycle</strong><small>Discovery to deployment · 7 phases</small></span><Icon name="check"/></button><button className="template-card"><Icon name="list"/><span><strong>Simple project</strong><small>Plan, execute, and complete</small></span></button></>}</div><div className="onboard-actions"><Button variant="secondary" onClick={()=>step>1&&setStep(step-1)} disabled={step===1}>Back</Button><Button onClick={()=>step===5?onLogin():setStep(step+1)}>{step===5?"Open workspace":"Continue"}</Button></div></div></main>
  return <main className="auth-layout"><section className="auth-showcase"><div className="auth-brand"><span className="brand-mark"><span/><span/><span/></span><div><strong>FlowProject</strong><small>Plan. Execute. Deliver.</small></div></div><div className="auth-copy"><span>PROJECT DELIVERY, CLARIFIED</span><h1>Keep every project moving forward.</h1><p>Plan the work, align your team, and deliver software on schedule—without losing sight of what matters next.</p></div><div className="auth-visual"><div className="visual-head"><span/><span/><span/></div><div className="visual-body"><div className="visual-side"/><div className="visual-main"><span/><div className="visual-stats"><i/><i/><i/></div><div className="visual-chart"><b/><b/><b/><b/><b/></div></div></div></div><small className="auth-quote">Built for teams that turn plans into products.</small></section><section className="auth-panel"><div className="auth-form">
    {screen==="login"&&<><div><h2>Welcome back</h2><p>Sign in to continue to your workspace.</p></div><Field label="Work email" type="email" placeholder="you@company.com"/><Field label="Password" type="password" placeholder="Enter your password"/><div className="form-options"><label><input type="checkbox"/> Remember me</label><button onClick={()=>setScreen("forgot")}>Forgot password?</button></div><Button onClick={onLogin}>Sign in</Button><div className="or"><span/>OR CONTINUE WITH<span/></div><div className="social-row"><Button variant="secondary">G&nbsp; Google</Button><Button variant="secondary">M&nbsp; Microsoft</Button></div><p className="auth-switch">New to FlowProject? <button onClick={()=>setScreen("register")}>Create an account</button></p></>}
    {screen==="register"&&<><div><h2>Create your account</h2><p>Start delivering better projects today.</p></div><Field label="Full name" placeholder="Victory Adams"/><Field label="Work email" type="email" placeholder="you@company.com"/><Field label="Organization name" placeholder="Acme Software"/><div className="form-grid"><Field label="Password" type="password" placeholder="At least 8 characters"/><Field label="Confirm password" type="password" placeholder="Repeat password"/></div><label className="terms"><input type="checkbox"/> I agree to the Terms and Privacy Policy</label><Button onClick={()=>setScreen("verify")}>Create account</Button><p className="auth-switch">Already have an account? <button onClick={()=>setScreen("login")}>Sign in</button></p></>}
    {screen==="forgot"&&<><button className="back-link" onClick={()=>setScreen("login")}><Icon name="arrow" size={14}/> Back to sign in</button><span className="auth-icon"><Icon name="mail" size={28}/></span><div><h2>Forgot your password?</h2><p>Enter your email and we’ll send you a reset link.</p></div><Field label="Work email" type="email" placeholder="you@company.com"/><Button onClick={()=>setScreen("login")}>Send reset link</Button></>}
    {screen==="verify"&&<><span className="auth-icon"><Icon name="mail" size={28}/></span><div><h2>Check your inbox</h2><p>We sent a verification link to <strong>victory@acme.dev</strong>.</p></div><Button onClick={()=>setScreen("onboarding")}>I’ve verified my email</Button><Button variant="secondary">Resend email</Button><p className="auth-switch">Wrong email? <button onClick={()=>setScreen("register")}>Change it</button></p></>}
  </div></section></main>
}

export default function App() {
  const [authenticated,setAuthenticated]=useState(true)
  const [route,setRoute]=useState<Route>("dashboard")
  const [modal,setModal]=useState<Modal>(null)
  const [collapsed,setCollapsed]=useState(false)
  const [mobileNav,setMobileNav]=useState(false)
  useEffect(()=>{const handler=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setModal("search")}if(e.key==="Escape")setModal(null)};window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler)},[])
  const page=useMemo(()=>{
    if(route==="dashboard") return <Dashboard go={setRoute} open={setModal}/>
    if(route==="projects") return <Projects go={setRoute} open={setModal}/>
    if(route==="project") return <ProjectOverview go={setRoute}/>
    if(route==="tasks") return <Tasks open={setModal}/>
    if(route==="projectTasks") return <Tasks open={setModal} projectMode go={setRoute}/>
    if(route==="board") return <Board go={setRoute} open={setModal}/>
    if(route==="calendar") return <Calendar open={setModal}/>
    if(route==="projectCalendar") return <Calendar go={setRoute} open={setModal}/>
    if(route==="team") return <Team go={setRoute} open={setModal}/>
    if(route==="projectTeam") return <Team go={setRoute} open={setModal} projectMode/>
    if(route==="notifications") return <Notifications open={setModal}/>
    if(route==="settings") return <Settings/>
    if(route==="milestones") return <Milestones go={setRoute} open={setModal}/>
    if(route==="activity") return <Activity go={setRoute}/>
    if(route==="dependencies") return <Dependencies go={setRoute} open={setModal}/>
  },[route])
  if(!authenticated) return <Auth onLogin={()=>setAuthenticated(true)}/>
  const navTo=(r:Route)=>{setRoute(r);setMobileNav(false)}
  return <div className="app-shell"><Sidebar route={route} go={navTo} collapsed={collapsed} setCollapsed={setCollapsed}/>{mobileNav&&<div className="mobile-overlay" onClick={()=>setMobileNav(false)}><div onClick={e=>e.stopPropagation()}><Sidebar route={route} go={navTo} collapsed={false} setCollapsed={()=>setMobileNav(false)}/></div></div>}<div className={`app-main ${collapsed?"sidebar-collapsed":""}`}><Topbar onMenu={()=>setMobileNav(true)} onSearch={()=>setModal("search")} onNotify={()=>setRoute("notifications")} onCreate={()=>setModal("create")}/><main className="content">{page}</main></div><nav className="bottom-nav">{[["dashboard","grid","Dashboard"],["tasks","check","Tasks"],["projects","folder","Projects"],["calendar","calendar","Calendar"],["notifications","bell","Alerts"]].map(([r,i,l])=><button key={r} className={route===r?"active":""} onClick={()=>navTo(r as Route)}><Icon name={i as IconName}/><span>{l}</span></button>)}</nav><ModalLayer modal={modal} close={()=>setModal(null)} go={setRoute}/><button className="demo-logout" onClick={()=>setAuthenticated(false)} title="View authentication flow"><Icon name="logout" size={15}/> Auth flow</button></div>
}
