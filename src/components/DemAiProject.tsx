import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  Braces,
  CheckCircle2,
  FileCode2,
  Folder,
  GitBranch,
  Layers3,
  Lock,
  Server,
  ShieldCheck,
  TestTube2,
} from 'lucide-react';

const tabs = [
  {
    id: 'architecture',
    label: 'Clean Architecture',
    icon: <Layers3 size={15} />,
    title: 'Boundaries are explicit',
    text: 'DEM AI is organized around API, Application, Domain, and Infrastructure layers so business rules do not leak into controllers or persistence code.',
    code: `HealthCare.Api
  Controllers
  Extensions
  Services
  DependencyInjection.cs

HealthCare.Application
  Features
    Appointments
    Prescriptions
  Common
    Behaviors
    Exceptions

HealthCare.Domain
  Entities
  ValueObjects
  DomainEvents

HealthCare.Infrastructure
  Persistence
  Identity
  ExternalServices`
  },
  {
    id: 'cqrs',
    label: 'CQRS / MediatR',
    icon: <GitBranch size={15} />,
    title: 'Commands and queries move through predictable handlers',
    text: 'Write operations and read models are split into focused request handlers, with Result<T> responses and MediatR pipeline behaviors for validation, logging, and failure handling.',
    code: `public sealed record CreatePrescriptionCommand(
  Guid PatientId,
  Guid DoctorId,
  IReadOnlyList<MedicineLineDto> Lines
) : IRequest<Result<Guid>>;

public sealed class CreatePrescriptionHandler
  : IRequestHandler<CreatePrescriptionCommand, Result<Guid>>
{
  public async Task<Result<Guid>> Handle(
    CreatePrescriptionCommand command,
    CancellationToken cancellationToken)
  {
    // validate domain rules
    // persist prescription
    // publish domain event
  }
}`
  },
  {
    id: 'result',
    label: 'Result Pattern',
    icon: <CheckCircle2 size={15} />,
    title: 'Use cases return explicit outcomes',
    text: 'Application handlers return Result<T> so success, validation failures, not-found states, and business conflicts are modeled without throwing for expected flow.',
    code: `public sealed class Result<T>
{
  public bool IsSuccess { get; }
  public bool IsFailure => !IsSuccess;
  public T? Value { get; }
  public Error Error { get; }

  public static Result<T> Success(T value) => new(value);
  public static Result<T> Failure(Error error) => new(error);
}

return prescription is null
  ? Result<Guid>.Failure(PrescriptionErrors.NotFound)
  : Result<Guid>.Success(prescription.Id);`
  },
  {
    id: 'validation',
    label: 'FluentValidation',
    icon: <FileCode2 size={15} />,
    title: 'Input rules run before handlers',
    text: 'FluentValidation keeps request validation close to each command/query and runs through a MediatR behavior before domain work starts.',
    code: `public sealed class CreatePrescriptionValidator
  : AbstractValidator<CreatePrescriptionCommand>
{
  public CreatePrescriptionValidator()
  {
    RuleFor(x => x.PatientId).NotEmpty();
    RuleFor(x => x.DoctorId).NotEmpty();
    RuleFor(x => x.Lines)
      .NotEmpty()
      .WithMessage("Prescription must contain medicine lines.");
  }
}

builder.Services.AddValidatorsFromAssembly(
  typeof(CreatePrescriptionValidator).Assembly);`
  },
  {
    id: 'api',
    label: 'API Handling',
    icon: <Server size={15} />,
    title: 'Controllers stay thin',
    text: 'HTTP endpoints delegate use cases to application handlers and map the Result Pattern into consistent HTTP responses for frontend consumers.',
    code: `[HttpPost("prescriptions")]
[Authorize(Roles = "Doctor")]
public async Task<IActionResult> CreatePrescription(
  CreatePrescriptionCommand command,
  CancellationToken cancellationToken)
{
  var result = await sender.Send(command, cancellationToken);
  return result.Match(
    id => CreatedAtAction(nameof(GetPrescription), new { id }, result),
    Problem);
}`
  },
  {
    id: 'security',
    label: 'Security',
    icon: <ShieldCheck size={15} />,
    title: 'Access follows role and ownership rules',
    text: 'JWT authentication, role policies, and guarded endpoints protect patient, doctor, and pharmacy workflows.',
    code: `builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = tokenValidation;
  });

builder.Services.AddAuthorization(options =>
{
  options.AddPolicy("DoctorOnly", policy =>
    policy.RequireRole("Doctor"));

  options.AddPolicy("PharmacyInventory", policy =>
    policy.RequireRole("Pharmacist", "Admin"));
});`
  },
  {
    id: 'errors',
    label: 'Errors',
    icon: <Braces size={15} />,
    title: 'Result and validation failures are normalized',
    text: 'FluentValidation errors, Result Pattern failures, not-found states, conflicts, and infrastructure errors are converted into stable ProblemDetails responses.',
    code: `public sealed class GlobalExceptionMiddleware
{
  public async Task InvokeAsync(HttpContext context)
  {
    try
    {
      await next(context);
    }
    catch (ValidationException ex)
    {
      await WriteProblem(context, 400, ex.Errors);
    }
    catch (DomainConflictException ex)
    {
      await WriteProblem(context, 409, ex.Message);
    }
  }
}

public IActionResult ToHttpResult(Result result)
{
  return result.IsSuccess
    ? Ok(result.Value)
    : Problem(result.Error.Description);
}`
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: <Box size={15} />,
    title: 'Environment setup is repeatable',
    text: 'The API, database, and supporting services can run through containerized configuration for local and deployment parity.',
    code: `services:
  healthcare-api:
    build:
      context: .
      dockerfile: HealthCare.Api/Dockerfile
    ports:
      - "8080:8080"
    depends_on:
      - sqlserver

  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"`
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: <TestTube2 size={15} />,
    title: 'Critical rules are testable without the UI',
    text: 'Application handlers and domain rules are designed so scheduling, prescription, and inventory behavior can be tested directly.',
    code: `[Fact]
public async Task CreatePrescription_rejects_empty_lines()
{
  var command = new CreatePrescriptionCommand(
    PatientId,
    DoctorId,
    Array.Empty<MedicineLineDto>());

  var result = await handler.Handle(command, CancellationToken.None);

  result.IsFailure.Should().BeTrue();
  result.Error.Code.Should().Be("Prescription.EmptyLines");
}`
  }
];

const tree = [
  { depth: 0, label: 'src', type: 'folder' },
  { depth: 1, label: 'HealthCare.Api', type: 'folder', active: true },
  { depth: 2, label: 'Controllers', type: 'folder' },
  { depth: 2, label: 'Extensions', type: 'folder' },
  { depth: 2, label: 'Services', type: 'folder' },
  { depth: 2, label: 'DependencyInjection.cs', type: 'file' },
  { depth: 2, label: 'Program.cs', type: 'file' },
  { depth: 1, label: 'HealthCare.Application', type: 'folder' },
  { depth: 2, label: 'Features', type: 'folder' },
  { depth: 2, label: 'Behaviors', type: 'folder' },
  { depth: 1, label: 'HealthCare.Domain', type: 'folder' },
  { depth: 2, label: 'Entities', type: 'folder' },
  { depth: 2, label: 'DomainEvents', type: 'folder' },
  { depth: 1, label: 'HealthCare.Infrastructure', type: 'folder' },
  { depth: 2, label: 'Persistence', type: 'folder' },
  { depth: 2, label: 'Identity', type: 'folder' },
];

const productScreenshots = [
  {
    title: 'Patient portal',
    desc: 'Verified patient access entry point through NIN lookup.',
    src: '/demai/patient-portal.webp'
  },
  {
    title: 'Doctor appointments',
    desc: 'Calendar planning with daily appointment limits and selected-day details.',
    src: '/demai/appointments-calendar.webp'
  },
  {
    title: 'Prescription builder',
    desc: 'Medication list, diagnosis text, and generated prescription preview.',
    src: '/demai/prescription-builder.webp'
  },
  {
    title: 'Pharmacy stock',
    desc: 'Stock and family-drug management for pharmacist workflows.',
    src: '/demai/stock-management.webp'
  },
  {
    title: 'Medication history',
    desc: 'Patient medication history table with doctor, enterprise, and diagnosis labels.',
    src: '/demai/medication-history.webp'
  }
];

export const DemAiProject: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, '', '/#projects');
    window.dispatchEvent(new Event('portfolio:navigation'));
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className="project-detail-page">
      <div className="detail-grid-bg" aria-hidden="true" />

      <div className="container detail-hero">
        <a href="/#projects" className="detail-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> All Projects
        </a>

        <div className="detail-tags font-mono">
          <span className="detail-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>Healthcare SaaS</span>
        </div>

        <div className="detail-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.dem-ai</div>
            <h1>DEM AI</h1>
            <p className="detail-role font-mono">Full-Stack Healthcare Platform</p>
            <p className="detail-summary">
              A medical ecosystem connecting patients, physicians, and pharmacies. The page below is designed for technical reviewers: architecture boundaries, APIs, security, CQRS, Dockerization, testing, and error strategy are visible instead of hidden behind a marketing screenshot.
            </p>
            <div className="detail-actions">
              <a
                className="detail-demo-link font-mono"
                href="https://ice-machine.github.io/HealthCare/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live demo <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="detail-metrics">
            <Metric icon={<ShieldCheck size={18} />} label="Security" value="JWT + role policies" />
            <Metric icon={<GitBranch size={18} />} label="Application" value="CQRS handlers" />
            <Metric icon={<CheckCircle2 size={18} />} label="Outcome Flow" value="Result Pattern" />
            <Metric icon={<FileCode2 size={18} />} label="Validation" value="FluentValidation" />
          </div>
        </div>
      </div>

      <div className="container architecture-showcase">
        <div className="vscode-window">
          <div className="vscode-titlebar">
            <div className="window-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <span className="font-mono">HealthCare.sln - Visual Architecture Review</span>
          </div>

          <div className="vscode-body">
            <aside className="vscode-sidebar">
              <div className="sidebar-title font-mono">EXPLORER</div>
              <div className="file-tree">
                {tree.map((item) => (
                  <div
                    key={`${item.depth}-${item.label}`}
                    className={`tree-row ${item.active ? 'is-active' : ''}`}
                    style={{ paddingLeft: `${12 + item.depth * 16}px` }}
                  >
                    {item.type === 'folder' ? <Folder size={14} /> : <FileCode2 size={14} />}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>

            <main className="vscode-main">
              <div className="vscode-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`vscode-tab ${activeTab.id === tab.id ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="vscode-panel">
                <div className="panel-copy">
                  <span className="panel-kicker font-mono">selected_module.cs</span>
                  <h2>{activeTab.title}</h2>
                  <p>{activeTab.text}</p>
                </div>

                <pre className="code-inspector">
                  <code>{activeTab.code}</code>
                </pre>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="container detail-sections">
        <article className="detail-section-card evidence-card">
          <span className="section-index font-mono">00</span>
          <h2>From The Project Document</h2>
          <p>
            The screenshots below come from the DEM AI final project document. I am using them as visual evidence while keeping the case study centered on backend architecture decisions.
          </p>
          <div className="evidence-grid">
            <figure className="evidence-figure evidence-figure--large">
              <img src="/demai/backend-architecture.webp" alt="DEM AI backend architecture diagram showing API, application, domain, infrastructure, SQL Server, and OpenStreetMap integrations" />
              <figcaption className="font-mono">backend-architecture.png</figcaption>
            </figure>
            <figure className="evidence-figure">
              <img src="/demai/api-testing.webp" alt="DEM AI API testing screenshot for pharmacy stock check with a 200 OK response" />
              <figcaption className="font-mono">api-testing-stock-check.png</figcaption>
            </figure>
          </div>
        </article>

        <article className="detail-section-card">
          <span className="section-index font-mono">01</span>
          <h2>API Surface</h2>
          <p>
            Endpoints are grouped around patient, doctor, pharmacy, appointment, and prescription workflows. Controllers receive HTTP concerns, then delegate use cases to handlers.
          </p>
          <div className="api-list font-mono">
            <span>POST /api/appointments</span>
            <span>GET /api/doctors/{'{id}'}/schedule</span>
            <span>POST /api/prescriptions</span>
            <span>PATCH /api/pharmacies/{'{id}'}/stock</span>
          </div>
        </article>

        <article className="detail-section-card">
          <span className="section-index font-mono">02</span>
          <h2>Enterprise Concerns</h2>
          <div className="concern-grid">
            <Concern icon={<Lock size={17} />} title="Authorization" text="Role policies separate patient, doctor, pharmacist, and admin actions." />
            <Concern icon={<Braces size={17} />} title="Errors" text="Domain and validation failures become stable API responses." />
            <Concern icon={<CheckCircle2 size={17} />} title="Result Pattern" text="Expected success and failure paths are returned explicitly from handlers." />
            <Concern icon={<FileCode2 size={17} />} title="FluentValidation" text="Command and query inputs are validated before business logic runs." />
            <Concern icon={<Box size={17} />} title="Docker" text="Containerized setup makes local review and deployment more repeatable." />
            <Concern icon={<CheckCircle2 size={17} />} title="Tests" text="Handlers and rules can be verified without clicking through the UI." />
          </div>
        </article>

        <article className="detail-section-card screenshot-card">
          <span className="section-index font-mono">03</span>
          <h2>Product Screenshots</h2>
          <p>
            These screens show how the backend capabilities surface in the product: patient access, doctor scheduling, prescriptions, history, and pharmacist stock management.
          </p>
          <div className="screenshot-grid">
            {productScreenshots.map((shot) => (
              <ScreenshotCard key={shot.title} {...shot} />
            ))}
          </div>
        </article>
      </div>

      <style>{`
        .project-detail-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
        }

        .detail-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .detail-hero,
        .architecture-showcase,
        .detail-sections {
          position: relative;
          z-index: 2;
        }

        .detail-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .detail-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .detail-back:hover {
          color: var(--color-blue);
        }

        .detail-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .detail-tags span:not(.detail-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .detail-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .detail-square {
          width: 12px;
          height: 12px;
          background: var(--color-text-primary);
          margin-right: var(--space-4);
        }

        .detail-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .detail-hero h1 {
          font-family: var(--font-body);
          font-size: clamp(58px, 8vw, 124px);
          font-weight: 800;
          letter-spacing: 0;
          margin: var(--space-3) 0;
        }

        .detail-role {
          color: var(--color-blue);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .detail-summary {
          max-width: 780px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .detail-demo-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          min-height: 42px;
          padding: 0 var(--space-5);
          border: 1px solid var(--color-blue);
          background: var(--color-blue);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .detail-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .detail-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .metric-box {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .metric-box:nth-child(2n) { border-right: none; }
        .metric-box:nth-last-child(-n + 2) { border-bottom: none; }

        .metric-box svg {
          color: var(--color-blue);
        }

        .metric-box strong {
          font-family: var(--font-body);
          font-size: 18px;
        }

        .metric-box span {
          font-family: var(--font-mono);
          color: var(--color-text-secondary);
          font-size: 11px;
        }

        .architecture-showcase {
          margin-top: var(--space-5);
        }

        .vscode-window {
          border: 1px solid var(--color-border);
          background: #151515;
          box-shadow: 0 24px 80px rgba(0,0,0,0.16);
          color: #d4d4d4;
        }

        .vscode-titlebar {
          height: 42px;
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: 0 var(--space-4);
          background: #1f1f1f;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.58);
          font-size: 12px;
        }

        .window-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot--red { background: #ff5f56; }
        .dot--yellow { background: #ffbd2e; }
        .dot--green { background: #27c93f; }

        .vscode-body {
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 640px;
        }

        .vscode-sidebar {
          background: #181818;
          border-right: 1px solid rgba(255,255,255,0.08);
          padding: var(--space-3) 0;
        }

        .sidebar-title {
          padding: 0 var(--space-4) var(--space-3);
          color: rgba(255,255,255,0.55);
          font-size: 11px;
        }

        .tree-row {
          min-height: 28px;
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,0.72);
          font-size: 13px;
        }

        .tree-row svg {
          color: #d7ba7d;
        }

        .tree-row.is-active {
          background: rgba(74, 127, 247, 0.24);
          color: #fff;
          border-left: 2px solid #4a7ff7;
        }

        .vscode-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .vscode-tabs {
          display: flex;
          flex-wrap: wrap;
          background: #1f1f1f;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .vscode-tab {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0 var(--space-4);
          border-right: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.58);
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .vscode-tab.is-active {
          background: #151515;
          color: #fff;
          box-shadow: inset 0 2px 0 var(--color-blue);
        }

        .vscode-panel {
          display: grid;
          grid-template-columns: minmax(280px, 0.55fr) minmax(0, 1fr);
          gap: var(--space-5);
          padding: var(--space-6);
          flex: 1;
        }

        .panel-copy {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          padding: var(--space-5);
        }

        .panel-kicker {
          color: #7aa2f7;
          font-size: 11px;
        }

        .panel-copy h2 {
          font-family: var(--font-body);
          color: #fff;
          font-weight: 800;
          letter-spacing: 0;
          font-size: 34px;
          margin: var(--space-4) 0;
        }

        .panel-copy p {
          color: rgba(255,255,255,0.68);
          line-height: 1.75;
          font-size: 15px;
        }

        .code-inspector {
          margin: 0;
          overflow: auto;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0f0f0f;
          color: #a9b1d6;
          padding: var(--space-5);
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.65;
          white-space: pre;
        }

        .detail-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .detail-section-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .detail-section-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .detail-section-card p {
          color: var(--color-text-secondary);
          max-width: 800px;
          line-height: 1.7;
        }

        .evidence-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.65fr);
          gap: var(--space-5);
          margin-top: var(--space-5);
          align-items: stretch;
        }

        .evidence-figure {
          margin: 0;
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          min-width: 0;
        }

        .evidence-figure img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          object-fit: contain;
          background: #fff;
          border: 1px solid var(--color-border-subtle);
        }

        .evidence-figure--large img {
          min-height: 520px;
        }

        .evidence-figure figcaption {
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .api-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .api-list span {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          color: var(--color-text-primary);
          font-size: 12px;
        }

        .concern-grid,
        .screenshot-grid {
          display: grid;
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .concern-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .concern-card {
          border: 1px solid var(--color-border);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
        }

        .concern-card svg {
          color: var(--color-blue);
        }

        .concern-card h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 17px;
          margin: var(--space-2) 0;
        }

        .concern-card p {
          font-size: 13px;
          line-height: 1.55;
        }

        .screenshot-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .screenshot-card-item {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard),
                      border-color var(--motion-medium) var(--ease-standard);
        }

        .screenshot-card-item:hover {
          border-color: var(--color-blue);
          transform: translateY(-4px);
        }

        .screenshot-frame {
          aspect-ratio: 16 / 9;
          background: #fff;
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          margin-bottom: var(--space-3);
        }

        .screenshot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .screenshot-card-item h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .screenshot-card-item p {
          font-size: 13px;
          line-height: 1.5;
        }

        .screenshot-card-item span {
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        @media (max-width: 1050px) {
          .detail-hero-grid,
          .vscode-body,
          .vscode-panel,
          .evidence-grid {
            grid-template-columns: 1fr;
          }
          .vscode-sidebar {
            display: none;
          }
          .concern-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .detail-hero {
            padding-top: var(--space-6);
          }
          .detail-hero-grid,
          .detail-metrics,
          .api-list,
          .concern-grid,
          .screenshot-grid,
          .evidence-grid {
            grid-template-columns: 1fr;
          }
          .evidence-figure img,
          .evidence-figure--large img {
            min-height: 240px;
          }
          .metric-box,
          .metric-box:nth-child(2n),
          .metric-box:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .metric-box:last-child {
            border-bottom: none;
          }
          .vscode-panel,
          .detail-section-card {
            padding: var(--space-4);
          }
          .code-inspector {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="metric-box">
    {icon}
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const Concern: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="concern-card">
    {icon}
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string }> = ({ title, desc, src }) => (
  <figure className="screenshot-card-item">
    <div className="screenshot-frame">
      <img src={src} alt={`DEM AI ${title} screenshot`} loading="lazy" />
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </figure>
);
