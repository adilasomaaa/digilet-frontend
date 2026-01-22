
const stats = [
  { value: "10K+", label: "Surat Terbit" },
  { value: "500+", label: "Pengguna Aktif" },
  { value: "50+", label: "Institusi" },
  { value: "99.9%", label: "Uptime Server" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                    <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
                    <p className="text-white/80 font-medium">{stat.label}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
