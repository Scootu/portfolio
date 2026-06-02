import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Box,
  Braces,
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
    text: 'MechanicShop is split into API, Application, Domain, Infrastructure, Contracts, and Client layers. Controllers handle HTTP concerns, application handlers own use cases, domain models protect business rules, and infrastructure handles persistence, identity, PDF generation, caching, logging, and real-time notifications.',
    code: `MechanicShop.Api
  Controllers
  OpenApi
  DependencyInjection.cs

MechanicShop.Application
  Features
  Common/Behaviours
  Interfaces

MechanicShop.Domain
  Customers
  Vehicles
  WorkOrders
  RepairTasks
  Billing

MechanicShop.Infrastructure
  Data
  Identity
  Caching
  RealTime
  Services

MechanicShop.Client
  Blazor WebAssembly UI`
  },
  {
    id: 'cqrs',
    label: 'CQRS / MediatR',
    icon: <GitBranch size={15} />,
    title: 'Use cases are isolated',
    text: 'Instead of putting business logic inside controllers, requests are converted into commands and queries. MediatR dispatches them to handlers, which keeps each workflow testable and easier to reason about.',
    code: `public async Task<IActionResult> UpdateState(
  Guid workOrderId,
  UpdateWorkOrderStateRequest request,
  CancellationToken ct)
{
  var command = new UpdateWorkOrderStateCommand(
    workOrderId,
    request.State);

  var result = await sender.Send(command, ct);

  return result.Match(
    _ => NoContent(),
    Problem);
}`
  },
  {
    id: 'auth',
    label: 'Authentication',
    icon: <Lock size={15} />,
    title: 'Login returns a token pair',
    text: 'The login endpoint validates credentials and returns an access token plus refresh token. The Blazor client stores the token response, attaches the access token to API requests, and rebuilds authenticated state from the current-user endpoint.',
    code: `[HttpPost("token/generate")]
public async Task<IActionResult> GenerateToken(
  [FromBody] GenerateTokenQuery request,
  CancellationToken ct)
{
  var result = await sender.Send(request, ct);

  return result.Match(
    response => Ok(response),
    Problem);
}

public async Task<Result<TokenResponse>> Handle(
  GenerateTokenQuery query,
  CancellationToken ct)
{
  var user = await identityService
    .GetUserByEmailAndPasswordAsync(query.Email, query.Password);

  if (user.IsError)
    return user.Errors;

  return await tokenProvider.GenerateJwtTokenAsync(user.Value, ct);
}`
  },
  {
    id: 'authorization',
    label: 'Authorization',
    icon: <ShieldCheck size={15} />,
    title: 'Managers and labors see different workflows',
    text: 'The app uses role policies for manager-only operations and labor-scoped work-order access. The same product supports different responsibilities without duplicating the app.',
    code: `services.AddAuthorizationBuilder()
  .AddPolicy("ManagerOnly", policy =>
    policy.RequireRole("Manager"))
  .AddPolicy("SelfScopedWorkOrderAccess", policy =>
    policy.Requirements.Add(new LaborAssignedRequirement()));

[Authorize(Policy = "ManagerOnly")]
public sealed class RepairTasksController : ApiController
{
}

[Authorize(Policy = "SelfScopedWorkOrderAccess")]
public async Task<IActionResult> GetAssignedWorkOrders(...)`
  },
  {
    id: 'workflow',
    label: 'Work Order Flow',
    icon: <Server size={15} />,
    title: 'Scheduling is a business workflow, not a table',
    text: 'A work order connects a customer, vehicle, repair tasks, labor, workshop spot, time slot, and status. The backend checks conflicts, labor availability, and valid state transitions before saving changes.',
    code: `Customer + Vehicle
      |
Repair Tasks + Parts
      |
Work Order
      |
Assign Labor + Spot + Time Slot
      |
Scheduled -> In Progress -> Completed
      |
Invoice`
  },
  {
    id: 'validation',
    label: 'Validation & Errors',
    icon: <Braces size={15} />,
    title: 'Failures are explicit',
    text: 'Requests pass through FluentValidation before handlers run. Domain and application failures are returned through a Result pattern, so controllers can convert errors into consistent HTTP responses.',
    code: `cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
cfg.AddOpenBehavior(typeof(PerformanceBehaviour<,>));
cfg.AddOpenBehavior(typeof(UnhandledExceptionBehaviour<,>));
cfg.AddOpenBehavior(typeof(CachingBehavior<,>));

public sealed class CreateWorkOrderValidator
  : AbstractValidator<CreateWorkOrderCommand>
{
  public CreateWorkOrderValidator()
  {
    RuleFor(x => x.CustomerId).NotEmpty();
    RuleFor(x => x.VehicleId).NotEmpty();
    RuleFor(x => x.TimeSlot).NotNull();
  }
}`
  },
  {
    id: 'realtime',
    label: 'Real-Time',
    icon: <GitBranch size={15} />,
    title: 'Work order changes notify the UI',
    text: 'SignalR broadcasts work order updates so schedule and work-order screens can stay current when jobs are assigned, moved, completed, or cancelled.',
    code: `app.MapHub<WorkOrderHub>("/hubs/workorders");

public async Task NotifyWorkOrderChanged(WorkOrder workOrder)
{
  await hub.Clients
    .Group($"labor:{workOrder.LaborId}")
    .SendAsync("WorkOrderChanged", workOrder.Id);
}`
  },
  {
    id: 'billing',
    label: 'Billing / PDF',
    icon: <FileCode2 size={15} />,
    title: 'The workflow ends with an invoice',
    text: 'Completed work orders can become invoices. The backend calculates labor and parts cost, stores billing records, supports settlement, and generates downloadable PDFs using QuestPDF.',
    code: `public async Task<Result<InvoiceDto>> IssueInvoice(
  IssueInvoiceCommand command,
  CancellationToken ct)
{
  var workOrder = await repository.GetWithTasks(command.WorkOrderId, ct);

  var invoice = Invoice.Create(
    workOrder.CustomerId,
    workOrder.CalculateLaborCost(),
    workOrder.CalculatePartsCost());

  await invoicePdfGenerator.GenerateAsync(invoice, ct);
  return invoice.ToDto();
}`
  },
  {
    id: 'testing',
    label: 'Testing / Docker',
    icon: <TestTube2 size={15} />,
    title: 'Backend behavior is testable',
    text: 'The solution includes unit, subcutaneous, and API integration tests. Integration tests can run with SQL Server through Testcontainers, while Docker keeps the app, database, and Seq observability setup repeatable.',
    code: `[Fact]
public async Task CreateWorkOrder_rejects_conflicting_slot()
{
  await SeedExistingWorkOrderAsync(spot: "A", timeSlot);

  var result = await sender.Send(new CreateWorkOrderCommand(
    customerId,
    vehicleId,
    laborId,
    spot: "A",
    timeSlot));

  result.IsFailure.Should().BeTrue();
  result.Error.Code.Should().Be("Schedule.Conflict");
}`
  }
];

const tree = [
  { depth: 0, label: 'src', type: 'folder' },
  { depth: 1, label: 'MechanicShop.Api', type: 'folder', active: true },
  { depth: 2, label: 'Controllers', type: 'folder' },
  { depth: 2, label: 'Endpoints', type: 'folder' },
  { depth: 2, label: 'Program.cs', type: 'file' },
  { depth: 1, label: 'MechanicShop.Application', type: 'folder' },
  { depth: 2, label: 'Features', type: 'folder' },
  { depth: 2, label: 'Behaviours', type: 'folder' },
  { depth: 1, label: 'MechanicShop.Domain', type: 'folder' },
  { depth: 2, label: 'WorkOrders', type: 'folder' },
  { depth: 2, label: 'RepairTasks', type: 'folder' },
  { depth: 2, label: 'Billing', type: 'folder' },
  { depth: 1, label: 'MechanicShop.Infrastructure', type: 'folder' },
  { depth: 2, label: 'Identity', type: 'folder' },
  { depth: 2, label: 'Caching', type: 'folder' },
  { depth: 2, label: 'RealTime', type: 'folder' },
  { depth: 2, label: 'Pdf', type: 'folder' },
  { depth: 1, label: 'MechanicShop.Client', type: 'folder' },
];

const screenshots = [
  {
    title: 'Manager dashboard',
    desc: 'Operational KPIs for orders, revenue, costs, profit, completion rate, and cancellation rate.',
    src: '/mechanicshop/manager-dashboard.png'
  },
  {
    title: 'Manager work orders',
    desc: 'Filtered work-order table with vehicle, customer, labor, repair tasks, status, and time slots.',
    src: '/mechanicshop/manager-workorders.png'
  },
  {
    title: 'Daily schedule',
    desc: 'Workshop spot schedule with time slots and labor filtering for planning the repair day.',
    src: '/mechanicshop/manager-schedules.png'
  },
  {
    title: 'Repair services',
    desc: 'Repair task catalog with labor/parts pricing used by work orders and invoices.',
    src: '/mechanicshop/manager-services.png'
  },
  {
    title: 'Labor dashboard',
    desc: 'Labor role view with the same platform shaped around assigned work and progress.',
    src: '/mechanicshop/labor-dashboard.png'
  },
  {
    title: 'Labor work orders',
    desc: 'Assigned work-order tracking for technicians without exposing manager-only operations.',
    src: '/mechanicshop/labor-workorders.png'
  }
];

export const MechanicShopProject: React.FC = () => {
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
    <section className="mechanic-detail-page">
      <div className="mechanic-grid-bg" aria-hidden="true" />

      <div className="container mechanic-hero">
        <a href="/#projects" className="mechanic-back font-mono" onClick={handleBack}>
          <ArrowLeft size={14} /> All Projects
        </a>

        <div className="mechanic-tags font-mono">
          <span className="mechanic-square" />
          <span>2026</span>
          <span>ASP.NET Core</span>
          <span>Blazor WebAssembly</span>
          <span>Workshop SaaS</span>
        </div>

        <div className="mechanic-hero-grid">
          <div>
            <div className="section-kicker font-mono">// project.mechanicshop</div>
            <h1>MechanicShop Workshop</h1>
            <p className="mechanic-role font-mono">Full-Stack Workshop Management Platform</p>
            <p className="mechanic-summary">
              A role-based web application for auto repair shop operations: customers, vehicles, repair services, labor assignments, daily schedules, work orders, invoices, PDF export, and performance dashboards.
            </p>
            <div className="mechanic-actions">
              <a
                className="mechanic-demo-link font-mono"
                href="http://localhost:5001/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open local app <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="mechanic-metrics">
            <Metric icon={<ShieldCheck size={18} />} label="Security" value="JWT + refresh tokens" />
            <Metric icon={<GitBranch size={18} />} label="Application" value="CQRS + MediatR" />
            <Metric icon={<Braces size={18} />} label="Validation" value="FluentValidation" />
            <Metric icon={<Box size={18} />} label="Operations" value="Docker + Seq" />
          </div>
        </div>
      </div>

      <div className="container mechanic-architecture">
        <div className="mechanic-vscode">
          <div className="mechanic-titlebar">
            <div className="window-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <span className="font-mono">MechanicShop.sln - Backend Architecture Review</span>
          </div>

          <div className="mechanic-vscode-body">
            <aside className="mechanic-sidebar">
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

            <main className="mechanic-main">
              <div className="mechanic-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`mechanic-tab ${activeTab.id === tab.id ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="mechanic-panel">
                <div className="mechanic-panel-copy">
                  <span className="panel-kicker font-mono">selected_workflow.cs</span>
                  <h2>{activeTab.title}</h2>
                  <p>{activeTab.text}</p>
                </div>

                <pre className="mechanic-code">
                  <code>{activeTab.code}</code>
                </pre>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="container mechanic-sections">
        <article className="mechanic-card mechanic-card--wide">
          <span className="section-index font-mono">00</span>
          <h2>What It Is</h2>
          <p>
            MechanicShop Workshop is designed around the real operational flow of a repair shop. Managers can create customers, vehicles, service tasks, schedules, and invoices, while labor users can view assigned work and follow work-order progress.
          </p>
        </article>

        <article className="mechanic-card">
          <span className="section-index font-mono">01</span>
          <h2>API Surface</h2>
          <p>
            Endpoints are grouped around identity, customers, vehicles, repair tasks, work orders, labors, invoices, and dashboard data. Controllers stay close to HTTP concerns, then pass commands and queries into the application layer.
          </p>
          <div className="mechanic-api-list font-mono">
            <span>POST /api/token/generate</span>
            <span>GET /api/dashboard/metrics</span>
            <span>POST /api/work-orders</span>
            <span>PATCH /api/work-orders/{'{id}'}/state</span>
            <span>POST /api/invoices</span>
            <span>GET /api/schedules/day</span>
          </div>
        </article>

        <article className="mechanic-card">
          <span className="section-index font-mono">02</span>
          <h2>Workflow Model</h2>
          <div className="mechanic-flow font-mono">
            <span>Customer</span>
            <span>Vehicle</span>
            <span>Repair tasks</span>
            <span>Labor + spot</span>
            <span>Work order status</span>
            <span>Invoice + PDF</span>
          </div>
        </article>

        <article className="mechanic-card">
          <span className="section-index font-mono">03</span>
          <h2>Enterprise Concerns</h2>
          <div className="mechanic-concerns">
            <Concern icon={<Lock size={17} />} title="Auth" text="JWT authentication with refresh-token support." />
            <Concern icon={<ShieldCheck size={17} />} title="Roles" text="Manager and labor permissions shape the UI and API access." />
            <Concern icon={<Braces size={17} />} title="Validation" text="FluentValidation and structured Result responses keep failures predictable." />
            <Concern icon={<GitBranch size={17} />} title="Real-time" text="SignalR broadcasts work-order updates to active screens." />
            <Concern icon={<FileCode2 size={17} />} title="PDF" text="QuestPDF turns completed work into downloadable invoices." />
            <Concern icon={<TestTube2 size={17} />} title="Tests" text="xUnit and Testcontainers cover behavior beyond the UI." />
          </div>
        </article>

        <article className="mechanic-card mechanic-card--screens">
          <span className="section-index font-mono">04</span>
          <h2>Product Screenshots</h2>
          <p>
            The screens below show the product side of the same backend decisions: dashboards, status-heavy tables, daily schedule planning, service catalogs, and role-specific technician views.
          </p>
          <div className="mechanic-screenshots">
            {screenshots.map((shot) => (
              <ScreenshotCard key={shot.title} {...shot} />
            ))}
          </div>
        </article>

        <article className="mechanic-card mechanic-card--wide">
          <span className="section-index font-mono">05</span>
          <h2>Outcome</h2>
          <p>
            The result is a complete workshop operations platform with a working Blazor frontend, secured API, database-backed workflows, real-time updates, invoice handling, PDF export, and automated tests. The case study is intentionally structured so senior developers can inspect the backend thinking while business readers can see the product flow.
          </p>
        </article>
      </div>

      <style>{`
        .mechanic-detail-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: var(--space-10);
          background: var(--color-bg-primary);
          overflow: hidden;
        }

        .mechanic-grid-bg {
          position: fixed;
          inset: 64px 0 0;
          background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.65;
          pointer-events: none;
        }

        .mechanic-hero,
        .mechanic-architecture,
        .mechanic-sections {
          position: relative;
          z-index: 2;
        }

        .mechanic-hero {
          padding: var(--space-8) var(--container-pad) var(--space-7);
        }

        .mechanic-back {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-text-secondary);
          font-size: 13px;
          margin-bottom: var(--space-6);
        }

        .mechanic-back:hover {
          color: var(--color-blue);
        }

        .mechanic-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-5);
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        .mechanic-tags span:not(.mechanic-square) {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: 6px 12px;
        }

        .mechanic-tags span:nth-child(2) {
          color: var(--color-orange);
          background: var(--color-orange-subtle);
        }

        .mechanic-square {
          width: 12px;
          height: 12px;
          background: var(--color-text-primary);
          margin-right: var(--space-4);
        }

        .mechanic-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.65fr);
          gap: var(--space-8);
          align-items: end;
        }

        .mechanic-hero h1 {
          max-width: 980px;
          font-family: var(--font-body);
          font-size: clamp(52px, 7.5vw, 112px);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 0.96;
          margin: var(--space-3) 0;
        }

        .mechanic-role {
          color: var(--color-blue);
          font-size: 18px;
          margin-bottom: var(--space-4);
        }

        .mechanic-summary {
          max-width: 820px;
          color: var(--color-text-secondary);
          font-size: 21px;
          line-height: 1.65;
          font-style: italic;
        }

        .mechanic-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .mechanic-demo-link {
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

        .mechanic-demo-link:hover {
          color: #fff;
          background: var(--color-black);
          border-color: var(--color-black);
        }

        .mechanic-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
        }

        .mechanic-metric {
          min-height: 116px;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-1);
          border-right: 1px solid var(--color-border-subtle);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .mechanic-metric:nth-child(2n) { border-right: none; }
        .mechanic-metric:nth-last-child(-n + 2) { border-bottom: none; }
        .mechanic-metric svg { color: var(--color-blue); }
        .mechanic-metric strong { font-family: var(--font-body); font-size: 18px; }
        .mechanic-metric span { font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 11px; }

        .mechanic-vscode {
          border: 1px solid var(--color-border);
          background: #151515;
          box-shadow: 0 24px 80px rgba(0,0,0,0.16);
          color: #d4d4d4;
        }

        .mechanic-titlebar {
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

        .mechanic-vscode-body {
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 690px;
        }

        .mechanic-sidebar {
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

        .mechanic-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .mechanic-tabs {
          display: flex;
          flex-wrap: wrap;
          background: #1f1f1f;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .mechanic-tab {
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

        .mechanic-tab.is-active {
          background: #151515;
          color: #fff;
          box-shadow: inset 0 2px 0 var(--color-blue);
        }

        .mechanic-panel {
          display: grid;
          grid-template-columns: minmax(280px, 0.55fr) minmax(0, 1fr);
          gap: var(--space-5);
          padding: var(--space-6);
          flex: 1;
        }

        .mechanic-panel-copy {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          padding: var(--space-5);
        }

        .panel-kicker {
          color: #7aa2f7;
          font-size: 11px;
        }

        .mechanic-panel-copy h2 {
          font-family: var(--font-body);
          color: #fff;
          font-weight: 800;
          letter-spacing: 0;
          font-size: 34px;
          margin: var(--space-4) 0;
        }

        .mechanic-panel-copy p {
          color: rgba(255,255,255,0.68);
          line-height: 1.75;
          font-size: 15px;
        }

        .mechanic-code {
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

        .mechanic-sections {
          display: grid;
          gap: var(--space-5);
          margin-top: var(--space-7);
        }

        .mechanic-card {
          border: 1px solid var(--color-border);
          background: color-mix(in srgb, var(--color-bg-primary) 88%, transparent);
          padding: var(--space-6);
        }

        .section-index {
          color: var(--color-orange);
          font-size: 12px;
        }

        .mechanic-card h2 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 32px;
          margin: var(--space-2) 0 var(--space-3);
        }

        .mechanic-card p {
          color: var(--color-text-secondary);
          max-width: 860px;
          line-height: 1.7;
        }

        .mechanic-flow {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .mechanic-api-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          margin-top: var(--space-5);
        }

        .mechanic-api-list span {
          min-height: 58px;
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          color: var(--color-text-primary);
          padding: var(--space-3);
          font-size: 12px;
          overflow-wrap: anywhere;
        }

        .mechanic-flow span {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          color: var(--color-text-primary);
          font-size: 12px;
        }

        .mechanic-concerns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .mechanic-concern {
          border: 1px solid var(--color-border);
          padding: var(--space-4);
          background: var(--color-bg-tertiary);
        }

        .mechanic-concern svg {
          color: var(--color-blue);
        }

        .mechanic-concern h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 17px;
          margin: var(--space-2) 0;
        }

        .mechanic-concern p {
          font-size: 13px;
          line-height: 1.55;
        }

        .mechanic-screenshots {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-5);
        }

        .mechanic-shot {
          border: 1px solid var(--color-border);
          background: var(--color-bg-tertiary);
          padding: var(--space-3);
          transition: transform var(--motion-medium) var(--ease-standard), border-color var(--motion-medium) var(--ease-standard);
        }

        .mechanic-shot:hover {
          border-color: var(--color-blue);
          transform: translateY(-4px);
        }

        .mechanic-shot-frame {
          aspect-ratio: 16 / 9;
          background: #202529;
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          margin-bottom: var(--space-3);
        }

        .mechanic-shot-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mechanic-shot h3 {
          font-family: var(--font-body);
          font-weight: 800;
          letter-spacing: 0;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .mechanic-shot p {
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .mechanic-hero-grid,
          .mechanic-vscode-body,
          .mechanic-panel {
            grid-template-columns: 1fr;
          }
          .mechanic-sidebar {
            display: none;
          }
          .mechanic-flow,
          .mechanic-api-list,
          .mechanic-concerns {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .mechanic-hero {
            padding-top: var(--space-6);
          }
          .mechanic-hero-grid,
          .mechanic-metrics,
          .mechanic-flow,
          .mechanic-api-list,
          .mechanic-concerns,
          .mechanic-screenshots {
            grid-template-columns: 1fr;
          }
          .mechanic-metric,
          .mechanic-metric:nth-child(2n),
          .mechanic-metric:nth-last-child(-n + 2) {
            border-right: none;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .mechanic-metric:last-child {
            border-bottom: none;
          }
          .mechanic-panel,
          .mechanic-card {
            padding: var(--space-4);
          }
          .mechanic-code {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
};

const Metric: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="mechanic-metric">
    {icon}
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const Concern: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="mechanic-concern">
    {icon}
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const ScreenshotCard: React.FC<{ title: string; desc: string; src: string }> = ({ title, desc, src }) => (
  <figure className="mechanic-shot">
    <div className="mechanic-shot-frame">
      <img src={src} alt={`MechanicShop ${title} screenshot`} loading="lazy" />
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </figure>
);
