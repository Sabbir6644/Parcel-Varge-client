

const Features = () => {
  const features = [
    {
      title: 'Parcel Safety',
      description: 'Secure and reliable handling of parcels to ensure safety throughout the journey.',
      icon: '📦',
    },
    {
      title: 'Super Fast Delivery',
      description: 'Swift and efficient delivery services, ensuring your parcels reach their destination in record time.',
      icon: '⚡️',
    },
    {
     title: '24/7 Customer Support',
     description: 'Round-the-clock assistance to address any queries or concerns regarding your deliveries.',
     icon: '📞',
   },
    // Add more feature objects as needed
  ];

  return (
    <section className=" py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
