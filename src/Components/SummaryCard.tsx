interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
}

function SummaryCard({ title, value, icon, description }: SummaryCardProps) {
  return (
    <div className="col-12 col-sm-6 col-xl-4">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body p-4">
          <div className="text-secondary small mb-2">{title}</div>

          <div className="d-flex align-items-center justify-content-between">
            <span className="display-6 fw-bold">{value}</span>
            <span className="fs-2" aria-hidden="true">
              {icon}
            </span>
          </div>

          <div className="text-secondary small mt-2">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
