'use client';

import { useState, useEffect } from 'react';
import { supabase, getSession } from '../lib/supabase';

interface Project {
  id: string;
  name: string;
  description: string;
  address: string;
  zip_code: string;
  project_type: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const session = await getSession();
    if (session) {
      setUser(session.user);
      loadProjects(session.user.id);
    } else {
      window.location.href = '/';
    }
  }

  async function loadProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading projects:', error);
    } else {
      setProjects((data as Project[]) || []);
    }
    setLoading(false);
  }

  async function createProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        address: formData.get('address') as string,
        zip_code: formData.get('zip_code') as string,
        project_type: formData.get('project_type') as string,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } else if (data) {
      setProjects([data, ...projects]);
      setShowNewProject(false);
      (e.target as HTMLFormElement).reset();
    }
  }

  async function deleteProject(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    } else {
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fafafa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '2px solid #222',
            borderTopColor: '#C0FE04',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: '#888' }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fafafa' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .dashboard-grid { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
        .sidebar { border-right: 1px solid #222; padding: 24px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .sidebar-logo { font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; margin-bottom: 40px; display: block; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; margin-bottom: 40px; }
        .sidebar-item { padding: 12px 16px; border-radius: 0; cursor: pointer; transition: all 0.2s; font-size: 0.875rem; color: #888; border: 1px solid transparent; background: none; text-align: left; width: 100%; }
        .sidebar-item:hover { color: #fafafa; background: #111; }
        .sidebar-item.active { color: #C0FE04; background: #111; border-color: #C0FE04; }
        .sidebar-section { font-family: 'JetBrains Mono', monospace; font-size: 0.6875rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; padding: 0 16px; }
        .main-content { padding: 40px; overflow-y: auto; }
        .page-header { margin-bottom: 40px; }
        .page-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; }
        .page-subtitle { color: #888; font-size: 0.9375rem; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 0.875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
        .btn-primary { background: #C0FE04; color: #000; }
        .btn-primary:hover { background: #a8d904; }
        .btn-secondary { background: transparent; color: #fafafa; border: 1px solid #222; }
        .btn-secondary:hover { border-color: #fafafa; }
        .btn-danger { background: transparent; color: #ff4444; border: 1px solid #ff4444; }
        .btn-danger:hover { background: #ff4444; color: #fff; }
        .project-card { border: 1px solid #222; padding: 24px; margin-bottom: 16px; cursor: pointer; transition: all 0.2s; background: #0a0a0a; }
        .project-card:hover { border-color: #fafafa; transform: translateX(4px); }
        .project-card.selected { border-color: #C0FE04; }
        .project-name { font-size: 1.125rem; font-weight: 700; margin-bottom: 8px; }
        .project-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; display: flex; gap: 16px; }
        .project-status { display: inline-block; padding: 4px 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #222; margin-top: 12px; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justifyContent: center; z-index: 100; }
        .modal { background: #0a0a0a; border: 1px solid #222; padding: 40px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; }
        .modal-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 24px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; background: #111; border: 1px solid #222; color: #fafafa; font-size: 0.9375rem; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
        .form-input:focus { outline: none; border-color: #C0FE04; }
        .form-textarea { min-height: 120px; resize: vertical; }
        .empty-state { text-align: center; padding: 80px 20px; }
        .empty-state-icon { font-size: 3rem; margin-bottom: 20px; opacity: 0.3; }
        .empty-state-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
        .empty-state-text { color: #888; margin-bottom: 32px; }
        .tabs { display: flex; gap: 4px; border-bottom: 1px solid #222; margin-bottom: 32px; }
        .tab { padding: 12px 24px; background: none; border: none; color: #888; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
        .tab:hover { color: #fafafa; }
        .tab.active { color: #C0FE04; border-bottom-color: #C0FE04; }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .sidebar { display: none; }
        }
      `}</style>

      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <a href="/" className="sidebar-logo">PermitAI</a>
          
          <nav className="sidebar-nav">
            <button className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`sidebar-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              Projects
            </button>
            <button className={`sidebar-item ${activeTab === 'new-project' ? 'active' : ''}`} onClick={() => { setActiveTab('new-project'); setShowNewProject(true); }}>
              New Project
            </button>
          </nav>

          <div className="sidebar-section">Account</div>
          <nav className="sidebar-nav">
            <button className="sidebar-item" onClick={() => window.location.href = '/pricing'}>
              Pricing
            </button>
            <button className="sidebar-item" onClick={signOut}>
              Sign Out
            </button>
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
            <div className="sidebar-section">Current Plan</div>
            <div style={{ 
              padding: '16px', 
              border: '1px solid #222', 
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div style={{ color: '#C0FE04', marginBottom: '8px' }}>Active</div>
              <div style={{ color: '#888' }}>Solo Contractor</div>
              <div style={{ color: '#555', marginTop: '8px' }}>$49/month</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === 'overview' && (
            <div>
              <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Welcome back, {user?.email}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                <div style={{ border: '1px solid #222', padding: '24px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    Active Projects
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>
                    {projects.filter(p => p.status === 'active').length}
                  </div>
                </div>
                <div style={{ border: '1px solid #222', padding: '24px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    Total Projects
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>
                    {projects.length}
                  </div>
                </div>
                <div style={{ border: '1px solid #222', padding: '24px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    This Month
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>
                    {projects.filter(p => {
                      const created = new Date(p.created_at);
                      const now = new Date();
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                    }).length}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Recent Projects</h2>
                <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                  + New Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <h3 className="empty-state-title">No projects yet</h3>
                  <p className="empty-state-text">Create your first project to get started with AI-powered permit assistance.</p>
                  <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                    Create Your First Project
                  </button>
                </div>
              ) : (
                <div>
                  {(projects.slice(0, 5) as Project[]).map((project) => {
                    const p = project as Project;
                    return (
                      <div 
                        key={p.id} 
                        className="project-card"
                        onClick={() => { setSelectedProject(p); setActiveTab('projects'); }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <div className="project-name">{p.name}</div>
                            <div className="project-meta">
                              <span>{p.project_type}</span>
                              <span>{p.zip_code}</span>
                              <span>{new Date(p.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="project-status" style={{ 
                              borderColor: p.status === 'active' ? '#C0FE04' : '#222',
                              color: p.status === 'active' ? '#C0FE04' : '#888'
                            }}>
                              {p.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="page-header">
                <h1 className="page-title">Projects</h1>
                <p className="page-subtitle">Manage your permit projects</p>
              </div>

              {selectedProject ? (
                <div>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedProject(null)}
                    style={{ marginBottom: '24px' }}
                  >
                    ← Back to projects
                  </button>

                  <div style={{ border: '1px solid #222', padding: '32px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>{selectedProject.name}</h2>
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>
                      <span>{selectedProject.project_type}</span>
                      <span>{selectedProject.zip_code}</span>
                      <span>{selectedProject.address}</span>
                    </div>
                    <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>{selectedProject.description}</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-primary" onClick={() => alert('AI analysis would start here')}>
                        Find Permits
                      </button>
                      <button className="btn btn-secondary" onClick={() => alert('Application drafter would open here')}>
                        Draft Application
                      </button>
                      <button className="btn btn-secondary" onClick={() => alert('Compliance check would run here')}>
                        Check Compliance
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => deleteProject(selectedProject.id)}
                    >
                      Delete Project
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>All Projects</h2>
                    <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                      + New Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-state-icon">📋</div>
                      <h3 className="empty-state-title">No projects yet</h3>
                      <p className="empty-state-text">Create your first project to get started.</p>
                      <button className="btn btn-primary" onClick={() => setShowNewProject(true)}>
                        Create Your First Project
                      </button>
                    </div>
                   ) : (
                     <div>
                       {(projects as Project[]).map((project) => {
                         const p = project as Project;
                         return (
                           <div 
                             key={p.id} 
                             className="project-card"
                             onClick={() => setSelectedProject(p)}
                           >
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                               <div style={{ flex: 1 }}>
                                 <div className="project-name">{p.name}</div>
                                 <div className="project-meta">
                                   <span>{p.project_type}</span>
                                   <span>{p.zip_code}</span>
                                   <span>{new Date(p.created_at).toLocaleDateString()}</span>
                                 </div>
                                 <div className="project-status" style={{ 
                                   borderColor: p.status === 'active' ? '#C0FE04' : '#222',
                                   color: p.status === 'active' ? '#C0FE04' : '#888'
                                 }}>
                                   {p.status}
                                 </div>
                               </div>
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-project' && (
            <div>
              <div className="page-header">
                <h1 className="page-title">New Project</h1>
                <p className="page-subtitle">Create a new permit project</p>
              </div>

              <div style={{ maxWidth: '600px' }}>
                <form onSubmit={createProject}>
                  <div className="form-group">
                    <label className="form-label">Project Name</label>
                    <input type="text" name="name" className="form-input" placeholder="e.g., Kitchen Remodel - 123 Main St" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Type</label>
                    <select name="project_type" className="form-input" required>
                      <option value="">Select project type...</option>
                      <option value="kitchen_remodel">Kitchen Remodel</option>
                      <option value="bathroom_remodel">Bathroom Remodel</option>
                      <option value="addition">Home Addition</option>
                      <option value="deck">Deck / Patio</option>
                      <option value="roofing">Roofing</option>
                      <option value="hvac">HVAC</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="foundation">Foundation / Structural</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-input form-textarea" placeholder="Describe your project in detail..." required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className="form-input" placeholder="123 Main St, City, State" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Zip Code</label>
                    <input type="text" name="zip_code" className="form-input" placeholder="78701" required />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn btn-primary">Create Project</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { setShowNewProject(false); setActiveTab('projects'); }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="modal-overlay" onClick={() => setShowNewProject(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">New Project</h2>
            <form onSubmit={createProject}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" name="name" className="form-input" placeholder="e.g., Kitchen Remodel" required />
              </div>
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select name="project_type" className="form-input" required>
                  <option value="">Select type...</option>
                  <option value="kitchen_remodel">Kitchen Remodel</option>
                  <option value="bathroom_remodel">Bathroom Remodel</option>
                  <option value="addition">Home Addition</option>
                  <option value="deck">Deck / Patio</option>
                  <option value="roofing">Roofing</option>
                  <option value="hvac">HVAC</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-input form-textarea" required />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input type="text" name="address" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input type="text" name="zip_code" className="form-input" required />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowNewProject(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
