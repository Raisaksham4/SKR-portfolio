import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Award,
  ExternalLink,
  Mail,
  MapPin,
  Server,
  Download,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";

const deploymentSteps = [
  "INITIALIZING TERRAFORM",
  "PROVISIONING AWS EC2",
  "BUILDING DOCKER IMAGE",
  "PUSHING IMAGE → ECR",
  "DEPLOYING CONTAINER",
  "RUNNING HEALTH CHECK",
];
const stackGroups = [
  {
    title: "CLOUD",
    items: ["AWS", "GCP", "EC2", "S3", "IAM", "VPC", "ECR", "CLOUDWATCH"],
  },
  {
    title: "DEVOPS",
    items: [
      "TERRAFORM",
      "DOCKER",
      "KUBERNETES",
      "GITHUB ACTIONS",
      "CI/CD",
      "GIT",
    ],
  },
  {
    title: "ENGINEERING",
    items: ["PYTHON", "SQL", "REST APIs", "LINUX", "NETWORKING", "SECURITY"],
  },
];
const capabilities = [
  {
    number: "01",
    title: "INFRASTRUCTURE",
    description:
      "Designing and provisioning cloud infrastructure with Terraform across AWS and GCP.",
    tags: ["AWS", "GCP", "TERRAFORM", "IAM"],
  },
  {
    number: "02",
    title: "CONTAINERS",
    description:
      "Containerizing applications and moving workloads from local development into cloud environments.",
    tags: ["DOCKER", "ECR", "KUBERNETES"],
  },
  {
    number: "03",
    title: "AUTOMATION",
    description:
      "Building CI/CD pipelines that automate builds, deployments and infrastructure changes.",
    tags: ["GITHUB ACTIONS", "CI/CD", "PYTHON"],
  },
  {
    number: "04",
    title: "OPERATIONS",
    description:
      "Monitoring systems, troubleshooting infrastructure and supporting reliable production environments.",
    tags: ["CLOUDWATCH", "LINUX", "NETWORKING", "SECURITY"],
  },
];

function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines((p) => [
        ...p,
        i < deploymentSteps.length ? deploymentSteps[i] : "SYSTEM READY.",
      ]);
      i++;
      if (i > deploymentSteps.length) {
        clearInterval(t);
        setTimeout(onComplete, 450);
      }
    }, 160);
    return () => clearInterval(t);
  }, [onComplete]);
  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65 }}
    >
      <div className="boot-content">
        <div className="boot-logo">
          SR<span>/</span>
        </div>
        <div className="boot-title">
          SAKSHAM<span>.OS</span>
        </div>
        <div className="boot-terminal">
          {lines.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="prompt">&gt;</span> {x}
            </motion.div>
          ))}
        </div>
        <div className="boot-progress">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.05 }}
          />
        </div>
        <div className="boot-status">
          SYSTEM STATUS: <span>ONLINE</span>
        </div>
      </div>
    </motion.div>
  );
}

function Navbar() {
  const items = [
    ["ABOUT", "#about"],
    ["STACK", "#stack"],
    ["PROJECTS", "#projects"],
    ["EXPERIENCE", "#experience"],
    ["CREDENTIALS", "#credentials"],
    ["CONTACT", "#contact"],
  ];
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <a href="#home" className="nav-logo">
        SR<span>/</span>
      </a>
      <div className="nav-links">
        {items.map(([x, h]) => (
          <a href={h} key={x}>
            {x}
          </a>
        ))}
      </div>
      <a href="#contact" className="nav-contact">
        LET'S CONNECT <ArrowUpRight size={15} />
      </a>
    </motion.nav>
  );
}

function TerminalWindow() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((x) => (x + 1) % deploymentSteps.length),
      1800,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      className="hero-terminal"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-name">
          <Terminal size={12} /> saksham@cloud
        </div>
      </div>
      <div className="terminal-body">
        <div>
          <span className="terminal-green">saksham@cloud</span>
          <span className="terminal-white">:</span>
          <span className="terminal-blue">~</span>
          <span className="terminal-white"> $ ./deploy.sh</span>
        </div>
        <motion.div
          key={step}
          className="deployment-status"
          initial={{ opacity: 0, x: -7 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="terminal-green">
            [{String(step + 1).padStart(2, "0")}]
          </span>
          <span className="terminal-white"> {deploymentSteps[step]}</span>
        </motion.div>
        <div className="deployment-progress">
          {deploymentSteps.map((_, i) => (
            <motion.span
              key={i}
              className={i <= step ? "progress-dot active" : "progress-dot"}
              animate={
                i === step ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </div>
        <div className="terminal-line">
          <span className="terminal-green">system</span>
          <span className="terminal-white"> ::</span>
        </div>
        {["AWS", "DOCKER", "TERRAFORM", "CI/CD"].map((x) => (
          <div className="terminal-output" key={x}>
            <span className="online">●</span> {x.padEnd(9, ".")} ONLINE
          </div>
        ))}
        <motion.div
          className="deployment-success"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✓ DEPLOYMENT PIPELINE ACTIVE
        </motion.div>
        <div className="terminal-cursor">
          <span className="terminal-green">saksham@cloud</span>
          <span className="terminal-white">:$ </span>
          <span className="cursor" />
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-final">
      <div className="hero-final-grid" />
      <div className="hero-final-glow" />
      <motion.div
        className="availability-box"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.65 }}
      >
        <motion.span
          className="availability-indicator"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="availability-label">OPEN TO</span>
        <strong>CLOUD / DEVOPS</strong>
        <strong>INTERNSHIPS</strong>
        <div className="availability-line" />
      </motion.div>
      <div className="hero-final-content">
        <motion.div
          className="hero-final-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CLOUD ENGINEER / DEVOPS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          FROM COMMIT
          <br />
          <span>TO CLOUD.</span>
        </motion.h1>
        <motion.p
          className="hero-final-description"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          I'm <strong>Saksham Rai</strong> — a Cloud and DevOps engineer focused
          on building infrastructure, automating deployments and running
          reliable cloud systems.
        </motion.p>
        <motion.div
          className="hero-final-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          {/* VIEW PROJECTS */}
          <a href="#projects" className="primary-button">
            VIEW PROJECTS
            <ArrowDown size={16} />
          </a>

          {/* RESUME */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-button"
          >
            <span>RESUME</span>
            <Download size={17} />
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Raisaksham4"
            target="_blank"
            rel="noreferrer"
            className="hero-social-button github-button"
            aria-label="GitHub"
          >
            <FaGithub className="github-logo" />
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/raisaksham"
            target="_blank"
            rel="noreferrer"
            className="hero-social-button"
            aria-label="LinkedIn"
          >
            <svg
              className="hero-brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <line x1="8" y1="10" x2="8" y2="16" />
              <line x1="8" y1="7.5" x2="8.01" y2="7.5" />
              <path d="M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16" />
              <line x1="12" y1="10" x2="12" y2="16" />
            </svg>
          </a>

          {/* CREDLY */}
          <a
            href="https://www.credly.com/users/raisaksham"
            target="_blank"
            rel="noreferrer"
            className="hero-social-button"
            aria-label="Credly"
          >
            <Award size={18} />
          </a>

          {/* EMAIL */}
          <a
            href="mailto:raisaksham204@gmail.com"
            className="hero-social-button"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </motion.div>
        <motion.div
          className="hero-final-toolchain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span>AWS</span>
          <i>•</i>
          <span>TERRAFORM</span>
          <i>•</i>
          <span>DOCKER</span>
          <i>•</i>
          <span>KUBERNETES</span>
          <i>•</i>
          <span>CI/CD</span>
          <i>•</i>
          <span>PYTHON</span>
        </motion.div>
      </div>
      <div className="hero-final-terminal">
        <TerminalWindow />
      </div>
      <motion.div
        className="hero-system-marker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="marker-corners">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="marker-content">
          <span>BUILD</span>
          <span>AUTOMATE</span>
          <span>DEPLOY</span>
          <span>SCALE</span>
        </div>
        <motion.div
          className="marker-cross"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          +
        </motion.div>
      </motion.div>
      <div className="hero-final-bottom">
        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </div>
        <div className="hero-section-index">
          <span>01</span>
          <div />
          <span>BUILD / SHIP / RUN</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="personal-about" id="about">
      <div className="personal-about-grid" />

      <div className="personal-about-header">
        <span className="section-number">02</span>

        <div>
          <span className="section-kicker">WHOAMI / PROFILE </span>

          <h2>
            THE PERSON
            <br />
            <span>BEHIND THE SYSTEM.</span>
          </h2>
        </div>
      </div>

      <div className="personal-about-content">
        {/* INTRO */}
        <div className="personal-story">
          <div className="terminal-command">
            <span>&gt;</span> whoami
          </div>

          <h3>
            I'm Saksham Rai — someone who enjoys turning ideas into systems that
            actually run.
          </h3>

          <p>
            My journey started with a curiosity for computers and how things
            work behind the screen. As I explored Computer Science, I became
            increasingly interested in what happens after the code is written —
            how it gets deployed, automated, scaled and kept running.
          </p>

          <p>
            That curiosity eventually pulled me toward cloud infrastructure and
            automation. Today, I spend my time building with AWS, Terraform,
            Docker and CI/CD, learning by actually creating things rather than
            just studying them.
          </p>

          <p>
            I like the part of engineering where an idea leaves the editor and
            becomes something real — infrastructure provisioned, containers
            deployed, pipelines triggered and systems that can be monitored and
            improved.
          </p>
        </div>

        {/* EDUCATION */}
        <div className="education-panel">
          <div className="education-label">EDUCATION / TIMELINE</div>

          <div className="education-timeline">
            <div className="education-item current">
              <div className="education-year">2023 — PRESENT</div>

              <div className="education-marker">
                <span />
              </div>

              <div className="education-info">
                <h3>VIT BHOPAL UNIVERSITY</h3>

                <p>B.Tech — Computer Science Engineering</p>

                <span>Cloud Computing &amp; Automation</span>
              </div>
            </div>

            <div className="education-item">
              <div className="education-year">2020 — 2022</div>

              <div className="education-marker">
                <span />
              </div>

              <div className="education-info">
                <h3>Central Hindu Boys School </h3>
                <p>Higher Secondary Education</p>
              </div>
            </div>

            <div className="education-item">
              <div className="education-year">2019-2020</div>

              <div className="education-marker">
                <span />
              </div>

              <div className="education-info">
                <h3>Sunbeam English School</h3>
                <p>Secondary Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATEMENT */}
      <div className="about-principle">
        <div className="principle-line" />

        <div className="principle-content">
          <span>PERSONAL PRINCIPLE</span>

          <strong>
            LEARN IT.
            <span> BUILD IT.</span>
            <br />
            MAKE IT RUN.
          </strong>
        </div>

        <div className="principle-index">02 / ABOUT</div>
      </div>
    </section>
  );
}

function SectionHeader({ number, kicker, first, second }) {
  return (
    <div className="section-header">
      <span className="section-number">{number}</span>
      <div>
        <span className="section-kicker">{kicker}</span>
        <h2>
          {first}
          <br />
          <span>{second}</span>
        </h2>
      </div>
    </div>
  );
}

function Stack() {
  const stackGroups = [
    {
      number: "01",
      title: "CLOUD",
      command: "cloud.runtime()",
      description: "Cloud platforms, infrastructure and services I work with.",
      items: ["AWS", "AZURE", "GCP", "EC2", "S3", "IAM", "VPC", "CLOUDWATCH"],
    },
    {
      number: "02",
      title: "DEVOPS & AUTOMATION",
      command: "pipeline.deploy()",
      description: "Infrastructure as code, CI/CD and automated delivery.",
      items: ["TERRAFORM", "GITHUB ACTIONS", "CI/CD", "GIT"],
    },
    {
      number: "03",
      title: "CONTAINERS",
      command: "container.run()",
      description: "Containerized workloads from build to deployment.",
      items: ["DOCKER", "KUBERNETES", "LOCALSTACK"],
    },
    {
      number: "04",
      title: "ENGINEERING",
      command: "system.build()",
      description: "The engineering layer behind the infrastructure.",
      items: [
        "PYTHON",
        "SQL",
        "LINUX",
        "PROMETHEUS",
        "GRAFANA",
        "REST APIs",
        "NETWORKING",
        "SECURITY",
      ],
    },
  ];

  return (
    <section className="stack-section" id="stack">
      <div className="stack-grid-bg" />

      <div className="stack-frame">
        {/* HEADER */}
        <div className="stack-header">
          <div className="stack-heading">
            <div className="stack-meta">
              <span className="stack-number">03</span>
              <span>ENGINEERING / TOOLCHAIN</span>
            </div>

            <h2>
              THE STACK
              <br />
              <span>I BUILD WITH.</span>
            </h2>
          </div>

          <div className="stack-intro">
            <p>
              Tools I use to build, automate, deploy and operate cloud
              infrastructure.
            </p>

            <div className="stack-count">
              <span>TOTAL</span>
              <strong>20+</strong>
              <small>TECHNOLOGIES</small>
            </div>
          </div>
        </div>

        {/* STACK GROUPS */}
        <div className="stack-groups">
          {stackGroups.map((group, index) => (
            <motion.div
              key={group.number}
              className="stack-group"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >
              <div className="stack-group-header">
                <div className="stack-group-title">
                  <span className="stack-group-number">{group.number}</span>

                  <h3>{group.title}</h3>

                  <span className="stack-live-dot" />
                </div>

                <span className="stack-command">&gt; {group.command}</span>
              </div>

              <p className="stack-description">{group.description}</p>

              <div className="stack-items">
                {group.items.map((item) => (
                  <motion.div
                    key={item}
                    className="stack-item"
                    whileHover={{
                      y: -3,
                    }}
                  >
                    <span className="stack-item-dot" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* WORKFLOW */}
        <div className="stack-workflow">
          <div className="workflow-label">
            <span>ENGINEERING WORKFLOW</span>
            <small>FROM IDEA TO IMPACT</small>
          </div>

          <div className="workflow-track">
            <span>CODE</span>
            <i>→</i>
            <span>BUILD</span>
            <i>→</i>
            <span>AUTOMATE</span>
            <i>→</i>
            <span>DEPLOY</span>
            <i>→</i>
            <span>MONITOR</span>
          </div>

          <span className="workflow-index">03 / STACK</span>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-grid-background" />
      <div className="projects-header">
        <span className="projects-number">04</span>
        <div>
          <span className="projects-kicker">ENGINEERING / SELECTED WORK</span>
          <h2>
            WHAT I<br />
            <span>SHIP.</span>
          </h2>
        </div>
      </div>
      <motion.article
        className="featured-project"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="project-topbar">
          <span className="project-id">PROJECT / 01</span>
          <span className="project-status">
            <span /> DEPLOYED
          </span>
        </div>
        <div className="featured-project-content">
          <div className="featured-project-info">
            <span className="project-type">
              FULL DEVOPS AUTOMATION PLATFORM
            </span>
            <h3>
              FROM CODE
              <br />
              <span>TO PRODUCTION.</span>
            </h3>
            <p className="project-description">
              A complete AWS deployment platform that automates infrastructure
              provisioning, container builds and application deployment through
              a single CI/CD workflow.
            </p>
            <div className="project-tags">
              {[
                "AWS",
                "TERRAFORM",
                "DOCKER",
                "GITHUB ACTIONS",
                "ECR",
                "IAM",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a
              href="https://github.com/Raisaksham4/AWS-Cost-Optimization"
              target="_blank"
              rel="noreferrer"
              className="project-source"
            >
              VIEW SOURCE
              <ExternalLink size={15} />
            </a>
          </div>
          <div className="project-architecture">
            <div className="architecture-label">DEPLOYMENT ARCHITECTURE</div>
            <div className="architecture-flow">
              {[
                ["01", "CODE", "GITHUB"],
                ["02", "CI/CD", "GITHUB ACTIONS"],
                ["03", "INFRA", "TERRAFORM"],
                ["04", "CONTAINER", "DOCKER / ECR"],
                ["05", "PRODUCTION", "AWS EC2"],
              ].map(([n, t, s], i) => (
                <div className="architecture-step-wrap" key={n}>
                  <motion.div
                    className={`architecture-node ${i === 4 ? "architecture-node-active" : ""}`}
                    whileHover={{ y: -4 }}
                  >
                    <span>{n}</span>
                    <strong>{t}</strong>
                    <small>{s}</small>
                  </motion.div>
                  {i < 4 && <div className="architecture-arrow">→</div>}
                </div>
              ))}
            </div>
            <div className="architecture-pipeline">
              <motion.div
                className="pipeline-pulse"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="architecture-terminal">
              <div className="mini-terminal-header">
                <span />
                <span />
                <span />
                <small>deployment.log</small>
              </div>
              <div className="mini-terminal-body">
                <div>
                  <b>$</b> terraform apply
                </div>
                <div>
                  <em>✓</em> infrastructure provisioned
                </div>
                <div>
                  <em>✓</em> docker image pushed to ECR
                </div>
                <div>
                  <em>✓</em> container deployed to EC2
                </div>
                <div className="terminal-success">SYSTEM STATUS: ONLINE</div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-metrics">
          <div className="project-metric">
            <strong>10+</strong>
            <span>APPLICATIONS</span>
          </div>
          <div className="project-metric">
            <strong>75%</strong>
            <span>LESS DEPLOYMENT TIME</span>
          </div>
          <div className="project-metric">
            <strong>100%</strong>
            <span>INFRASTRUCTURE AS CODE</span>
          </div>
          <div className="project-metric">
            <strong>0</strong>
            <span>HARDCODED CREDENTIALS</span>
          </div>
        </div>
      </motion.article>
      <motion.article
        className="secondary-project"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="secondary-project-number">PROJECT / 02</div>
        <div className="secondary-project-main">
          <span className="project-type">
            AWS COST OPTIMIZATION & GOVERNANCE
          </span>
          <h3>
            FIND WASTE.
            <br />
            <span>FIX IT.</span>
          </h3>
          <p>
            A Python-based AWS resource scanner that identifies orphaned and
            underutilized infrastructure, generates reports and supports safe
            dry-run remediation.
          </p>
          <div className="project-tags">
            {["PYTHON", "BOTO3", "TERRAFORM", "LOCALSTACK", "AWS"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a
            href="https://github.com/Raisaksham4/AWS-Cost-Optimization"
            target="_blank"
            rel="noreferrer"
            className="project-source"
          >
            VIEW SOURCE
            <ExternalLink size={15} />
          </a>
        </div>
        <div className="optimization-panel">
          <div className="optimization-header">
            <span>RESOURCE SCANNER</span>
            <span>● RUNNING</span>
          </div>
          <div className="resource-list">
            {[
              ["EBS VOLUMES", "ORPHANED"],
              ["EC2 INSTANCES", "STOPPED"],
              ["ELASTIC IPs", "UNASSOCIATED"],
              ["ASSETS", "UNTAGGED"],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <strong>{b}</strong>
              </div>
            ))}
          </div>
          <div className="optimization-footer">
            <span>SCAN COMPLETE</span>
            <strong>50% POTENTIAL SAVINGS</strong>
          </div>
        </div>
      </motion.article>
      <div className="projects-footer">
        <span>ENGINEERING LOOP</span>
        <div>
          <span>BUILD</span>
          <i>→</i>
          <span>TEST</span>
          <i>→</i>
          <span>DEPLOY</span>
          <i>→</i>
          <span>OBSERVE</span>
          <i>→</i>
          <span>IMPROVE</span>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      number: "01",
      period: "AUG 2026 — PRESENT",
      company: "MACTORES",
      role: "Cloud Engineer Intern",
      status: "CURRENT",
      icon: Server,

      environment: "AWS / MULTI-CLOUD",
      operations: "24×7 PRODUCTION SUPPORT",
      automation: "CHEF / SCRIPTING",
      monitoring: "INFRASTRUCTURE / MONITORING",

      bullets: [
        "Supporting multi-cloud architectures across AWS as designed by Solutions Architects.",
        "Providing 24×7 production infrastructure support and monitoring.",
        "Working with Chef, scripting and open-source tooling for operational automation.",
        "Preparing operational reports and evaluating cloud technologies.",
      ],

      technologies: ["AWS", "CHEF", "LINUX", "SCRIPTING", "MONITORING"],
    },

    {
      number: "02",
      period: "MAY 2026 — JUL 2026",
      company: "BONDSPE FINANCIAL SERVICES",
      role: "Cloud Engineer Intern",
      status: "COMPLETED",
      icon: Workflow,

      environment: "AWS CLOUD",
      operations: "EC2 / STORAGE / NETWORKING",
      automation: "DOCKER / GITHUB ACTIONS",
      monitoring: "TROUBLESHOOTING / SECURITY",

      bullets: [
        "Worked with AWS compute, storage and networking services.",
        "Containerized workloads with Docker and automated delivery with GitHub Actions.",
        "Troubleshot cloud infrastructure and supported monitoring and security.",
      ],

      technologies: ["AWS", "EC2", "DOCKER", "GITHUB ACTIONS", "CI/CD"],
    },
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="section-grid" />

      <div className="experience-header">
        <div className="experience-index">05</div>

        <div>
          <span className="section-kicker">ENGINEERING / EXPERIENCE</span>

          <h2>
            WHERE I
            <br />
            <span>OPERATE.</span>
          </h2>
        </div>
      </div>

      <div className="experience-timeline">
        <div className="experience-line">
          <motion.div
            className="experience-line-pulse"
            animate={{
              top: ["100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {experiences.map((experience, index) => {
          const Icon = experience.icon;

          return (
            <motion.article
              className="experience-item"
              key={experience.company}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
            >
              <div className="experience-marker">
                <motion.div
                  className="experience-dot"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(140,255,181,0)",
                      "0 0 18px rgba(140,255,181,0.55)",
                      "0 0 0 rgba(140,255,181,0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </div>

              <div className="experience-period">
                <span>{experience.number}</span>
                <small>{experience.period}</small>
              </div>

              <div className="experience-main">
                <div className="experience-top">
                  <div>
                    <span className="experience-role">{experience.role}</span>

                    <h3>{experience.company}</h3>
                  </div>

                  <div className="experience-status">
                    <span className="status-indicator" />
                    {experience.status}
                  </div>
                </div>

                <div className="experience-system">
                  <div className="system-row">
                    <span>ENVIRONMENT</span>
                    <strong>{experience.environment}</strong>
                  </div>

                  <div className="system-row">
                    <span>OPERATIONS</span>
                    <strong>{experience.operations}</strong>
                  </div>

                  <div className="system-row">
                    <span>AUTOMATION</span>
                    <strong>{experience.automation}</strong>
                  </div>

                  <div className="system-row">
                    <span>MONITORING</span>
                    <strong>{experience.monitoring}</strong>
                  </div>
                </div>

                <div className="experience-content">
                  <div className="experience-bullets">
                    {experience.bullets.map((bullet) => (
                      <div className="experience-bullet" key={bullet}>
                        <Check size={14} />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="experience-tech">
                    <div className="experience-tech-header">
                      <span>TECHNOLOGY / STACK</span>

                      <div className="experience-icon">
                        <Icon size={23} />
                      </div>
                    </div>

                    <div className="experience-tags">
                      {experience.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="experience-footer">
        <span>PRODUCTION MINDSET</span>

        <div>
          <span>BUILD</span>
          <i>→</i>
          <span>DEPLOY</span>
          <i>→</i>
          <span>MONITOR</span>
          <i>→</i>
          <span>IMPROVE</span>
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  const credentials = [
    {
      id: "01",
      issuer: "AMAZON WEB SERVICES",
      title: "AWS CERTIFIED SOLUTIONS ARCHITECT",
      level: "ASSOCIATE",
      date: "AUG 2026",
      code: "SAA-C03",
      type: "CLOUD ARCHITECTURE",
      link: "https://www.credly.com/badges/0436eda9-75eb-4a00-a5b5-84106ff8d314/public_url",
    },
    {
      id: "02",
      issuer: "AMAZON WEB SERVICES",
      title: "AWS CERTIFIED CLOUD PRACTITIONER",
      level: "FOUNDATIONAL",
      date: "JUN 2026",
      code: "CLF-C02",
      type: "CLOUD FUNDAMENTALS",
      link: "https://www.credly.com/badges/42fb81d8-2075-4676-ad36-854d92c3b82f/public_url",
    },
    {
      id: "03",
      issuer: "ANTHROPIC",
      title: "CLAUDE CERTIFIED ARCHITECT",
      level: "FOUNDATIONS",
      date: "SEP 2026",
      code: "CLAUDE",
      type: "AI / SOLUTION ARCHITECTURE",
      link: "https://www.credly.com/badges/0186a15d-9dfe-4a80-a7cb-cb347a30961c/public_url",
    },
    {
      id: "04",
      issuer: "GOOGLE",
      title: "GOOGLE IT SUPPORT",
      level: "PROFESSIONAL CERTIFICATE",
      date: "JAN 2026",
      code: "GOOGLE",
      type: "SYSTEMS & IT",
      link: "https://www.credly.com/badges/9d8b36fc-3c5f-495f-ac1e-1287d71ba113/public_url",
    },
  ];

  return (
    <section className="credentials-section" id="credentials">
      <div className="credentials-grid-bg" />

      <div className="credentials-header">
        <div className="credentials-index">
          <span>06</span>
          <span>CREDENTIALS / VERIFIED</span>
        </div>

        <div className="credentials-heading">
          <span className="credentials-kicker">PROOF OF CAPABILITY</span>

          <h2>
            VERIFIED
            <br />
            <span>IN THE CLOUD.</span>
          </h2>

          <p>
            Certifications and hands-on cloud achievements that complement the
            systems I build, automate and deploy.
          </p>
        </div>

        <div className="credentials-status">
          <span className="credential-live-dot" />
          ALL SYSTEMS VERIFIED
        </div>
      </div>

      <div className="credentials-terminal">
        <div className="credential-terminal-top">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>

          <span>credentials.log</span>

          <span className="terminal-online">● ONLINE</span>
        </div>

        <div className="credential-terminal-body">
          <span className="terminal-green">saksham@cloud</span>

          <span className="terminal-white">:~$ credentials --verify</span>

          <div className="credential-command-output">
            <span>→ scanning certifications...</span>
            <span>→ validating cloud credentials...</span>
            <span className="terminal-green">→ 04 certs found</span>
          </div>
        </div>
      </div>

      <div className="credentials-list">
        {credentials.map((credential, index) => (
          <motion.a
            key={credential.id}
            className="credential-card"
            href={credential.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: index * 0.1,
            }}
            whileHover={{ y: -5 }}
          >
            <div className="credential-number">{credential.id}</div>

            <div className="credential-main">
              <div className="credential-meta">
                <span>{credential.issuer}</span>
                <span>{credential.date}</span>
              </div>

              <h3>{credential.title}</h3>

              <div className="credential-level">{credential.level}</div>

              <div className="credential-bottom">
                <span>{credential.type}</span>

                <span className="credential-code">{credential.code}</span>
              </div>
            </div>

            <div className="credential-verification">
              <motion.div
                className="verification-ring"
                animate={{
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                <ShieldCheck size={22} />
              </motion.div>

              <span>VERIFIED</span>
            </div>
          </motion.a>
        ))}
      </div>
      {/* HANDS-ON ACHIEVEMENT */}

      <motion.div
        className="cloud-achievement"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="achievement-label">
          <span>HANDS-ON / ACHIEVEMENT</span>
          <span>2025</span>
        </div>

        <div className="achievement-main">
          <div className="achievement-title">
            <span>GOOGLE CLOUD</span>

            <h3>
              ARCADE
              <br />
              <strong>LEGEND</strong>
            </h3>

            <p>
              Hands-on cloud learning across infrastructure, containers, data
              and AI through the Google Cloud Arcade program.
            </p>
          </div>

          <div className="achievement-stats">
            <div>
              <strong>400+</strong>
              <span>CLOUD LABS</span>
            </div>

            <div>
              <strong>85</strong>
              <span>POINTS</span>
            </div>

            <div>
              <strong>GKE</strong>
              <span>COMPUTE ENGINE</span>
            </div>

            <div>
              <strong>BIGQUERY</strong>
              <span>VERTEX AI</span>
            </div>
          </div>
        </div>

        <div className="achievement-footer">
          <span>&gt; achievement --verified</span>

          <span className="achievement-status">
            <i />
            COMPLETED
          </span>
        </div>
      </motion.div>

      <div className="credentials-footer">
        <div>
          <span className="footer-command">&gt; verify --profile saksham</span>
          <span className="footer-result">CLOUD ENGINEERING / DEVOPS</span>
        </div>

        <div className="credential-stack">
          <span>AWS</span>
          <span>GCP</span>
          <span>INFRASTRUCTURE</span>
          <span>AUTOMATION</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid" />

      <div className="contact-number">07</div>

      <div className="contact-content">
        <span className="section-kicker">ENDPOINT / CONTACT</span>

        <h2>
          LET'S
          <br />
          <span>BUILD.</span>
        </h2>

        <p>
          Looking for a Cloud Engineering or DevOps internship where I can
          build, automate, deploy and learn alongside an engineering team.
        </p>

        <div className="contact-actions">
          {/* EMAIL */}
          <a href="mailto:raisaksham204@gmail.com" className="primary-button">
            <Mail size={15} />
            SEND EMAIL
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Raisaksham4"
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            <svg className="github-logo" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55
                0-.27-.01-1-.02-1.96-3.2.69-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.68-1.28-1.68
                -1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25
                3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7
                0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18
                .91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18
                3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1
                0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.16
                0 1.56-.01 2.82-.01 3.2 0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12
                23.5 5.65 18.35.5 12 .5Z"
              />
            </svg>
            GITHUB
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/raisaksham"
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            <svg
              className="hero-brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <line x1="8" y1="10" x2="8" y2="16" />
              <line x1="8" y1="7.5" x2="8.01" y2="7.5" />
              <path d="M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16" />
              <line x1="12" y1="10" x2="12" y2="16" />
            </svg>
            LINKEDIN
          </a>
        </div>

        <div className="contact-meta">
          <span>
            <MapPin size={12} /> INDIA
          </span>

          <a href="mailto:raisaksham204@gmail.com">raisaksham204@gmail.com</a>
        </div>
      </div>

      {/* CONNECTION TERMINAL */}
      <div className="contact-terminal">
        <div className="contact-terminal-title">
          <Terminal size={13} /> connection.status
        </div>

        <div>
          <span className="terminal-green">endpoint</span> :: AVAILABLE
        </div>

        <div>
          <span className="terminal-green">response</span> :: READY
        </div>

        <div>
          <span className="terminal-green">next</span> :: BUILD SOMETHING
        </div>

        <div className="terminal-success">✓ CONNECTION OPEN</div>
      </div>
    </section>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor">
        <span />
      </div>

      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
