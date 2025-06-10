type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: { label: string; color?: string }[];
  isHighlight?: boolean;
  highlightText?: string;
  buttonText: string;
  onClick?: () => void;
};

export default function PricingCard({
  title,
  description,
  price,
  features,
  isHighlight = false,
  highlightText,
  buttonText,
  onClick,
}: PricingCardProps) {
  return (
    <div
      className={`border-2 rounded-xl overflow-hidden relative ${
        isHighlight ? "border-blue-500" : "border-gray-200"
      } bg-white shadow-sm`}
    >
      {isHighlight && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
          {highlightText}
        </div>
      )}

      <div className="text-center p-6 border-b border-gray-100">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="text-4xl font-bold text-gray-900 mt-4">{price}</div>
      </div>

      <div className="p-6 space-y-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <span className={`${feature.color ?? "text-green-500"}`}>✓</span>
            <span>{feature.label}</span>
          </div>
        ))}

        <button
          onClick={onClick}
          className={`w-full mt-6 py-3 rounded-lg font-semibold text-center transition ${
            isHighlight
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
