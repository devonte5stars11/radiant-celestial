# 🐝 Skill: AGENT_SWARM
**Class**: `Meta / Orchestration`
**Purpose**: Deploy multiple specialized AI personas to collaborate on complex tasks from different expert perspectives.

## 📜 Description
Beyond single-model routing (Trinity), Agent Swarm deploys a **team of specialist personas** who analyze the same problem from different angles and synthesize their insights into a comprehensive solution.

## 👥 The Specialist Personas

### 🛡️ Security Auditor
**Role**: Find vulnerabilities, enforce security best practices  
**Focus**: Auth, data protection, XSS, SQL injection, CORS, CSP  
**Model**: Claude 3.5 Sonnet (best judgment)

### ⚡ Performance Engineer  
**Role**: Optimize speed, reduce bundle size, improve metrics  
**Focus**: Core Web Vitals, lazy loading, caching, DB queries  
**Model**: DeepSeek R1 (algorithmic optimization)

### 🎨 UX Specialist
**Role**: Improve user experience, accessibility, design consistency  
**Focus**: A11y, mobile responsiveness, visual hierarchy, micro-interactions  
**Model**: Claude 3.5 Sonnet (human-centric reasoning)

### 📚 Documentation Expert
**Role**: Create clear, comprehensive documentation  
**Focus**: JSDoc, README, inline comments, API docs  
**Model**: Claude 3.5 Sonnet (best prose)

### 🧪 Test Architect
**Role**: Design testing strategies, write test cases  
**Focus**: Unit tests, integration tests, E2E, edge cases  
**Model**: DeepSeek R1 (systematic coverage)

### 🏗️ System Architect
**Role**: High-level design, patterns, scalability  
**Focus**: Architecture patterns, data flow, modularity  
**Model**: Gemini 2.0 Flash (broad reasoning)

## ⚡ Protocol

### Single-Persona Mode
Use when you need one expert perspective:
```bash
node scripts/swarm.mjs --persona=security "Review auth.ts"
node scripts/swarm.mjs --persona=performance "Optimize dashboard"
```

### Swarm Mode (Multi-Persona)
Deploy multiple specialists simultaneously:
```bash
node scripts/swarm.mjs --swarm "Review the settings page implementation"
```

This will:
1. Deploy **Security Auditor** to check for vulnerabilities
2. Deploy **Performance Engineer** to find bottlenecks
3. Deploy **UX Specialist** to assess usability
4. Deploy **Documentation Expert** to review clarity
5. **Synthesize** all feedback into actionable recommendations

## 🧬 Example Output

**Input**: "Review the authentication system"

**Security Auditor**:
- ⚠️ Password stored in plaintext localStorage
- ✅ HTTPS enforced
- ⚠️ No rate limiting on login endpoint

**Performance Engineer**:
- ✅ Auth token cached efficiently
- ⚠️ Synchronous bcrypt blocking event loop
- 💡 Recommendation: Use bcrypt.compareAsync

**UX Specialist**:
- ✅ Clear error messages
- ⚠️ No "Loading..." state during auth check
- 💡 Add skeleton loader

**Synthesis**:
Priority fixes:
1. Move passwords to secure httpOnly cookies
2. Implement rate limiting (10 attempts/hour)
3. Add async bcrypt + loading states

## 🎯 When to Use Agent Swarm

**Use Swarm for:**
- Pre-launch code reviews
- Complex feature audits
- Performance optimization sprints
- Security hardening
- Accessibility compliance

**Don't Use Swarm for:**
- Simple bug fixes (use single model)
- Rapid prototyping (too slow)
- Trivial tasks (overkill)

## 💎 Benefits
- **Multi-perspective analysis**: No blind spots
- **Expert-level insights**: Each persona is specialized
- **Comprehensive coverage**: Security + Performance + UX together
- **Actionable synthesis**: Prioritized recommendations
