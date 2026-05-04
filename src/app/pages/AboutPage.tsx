import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  const sections = [
    {
      title: 'At Easirent Properties',
      text: 'We\'re redefining the rental experience with our comprehensive suite of services aimed at simplifying the process for both residential and commercial property owners. As a group of companies dedicated to excellence in property management, we ensure efficiency, security, and peace of mind for our clients.',
      image:
        'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Modern residential property exterior',
    },
    {
      title: 'Our Flagship Rental Management',
      text: 'Central to our offerings is our flagship rental management system designed to revolutionalize the way properties are managed. With advanced PIN and biometric access features, we\'ve simplified the rental process onto a full prepaid model, enhancing security and convenience for both landlords and tenants. Our system monitors access based on rental payments, electricity, and water usage, ensuring compliance while facilitating better collection and recovery of rental income.',
      image:
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Secure access and digital property management technology',
    },
    {
      title: 'Integration with Major Banks',
      text: 'To further streamline rental management, our system seamlessly integrates with all major banks for automatic payment collection and bank feed processing. This integration eliminates manual processes, reduces administrative burdens, and ensures timely and accurate financial transactions, enhancing overall efficiency and transparency.',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Banking and payment integration concept',
    },
    {
      title: 'Comprehensive Maintenance Services',
      text: 'In addition to our innovative rental management, our group of companies offers a comprehensive range of repair, maintenance, and supply services. From plumbing and electrical work to reinstatement and technological upgrades, we\'re equipped to handle all types of property maintenance needs. Our commitment to prompt response times ensures minimal disruption for tenants and maximizes property value for landlords, while our turnkey solutions provide full peace of mind.',
      image:
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Property maintenance and repair service team',
    },
    {
      title: 'Experience the Easirent Advantage',
      text: 'Join the growing number of property owners who have entrusted their rental management needs to Easirent Properties. Whether you are looking for a more efficient way to manage your properties or seeking reliable maintenance solutions, we are committed to delivering service that exceeds expectations. Experience the Easirent Advantage today and unlock the full potential of your rentals.',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Happy property owner reviewing rental performance',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12">
          <h1 className="text-3xl text-gray-900 mb-10" style={{ fontWeight: 700 }}>
            About Us
          </h1>

          <div className="space-y-10">
            {sections.map((section, index) => {
              const isEven = index % 2 === 0;

              return (
                <section key={section.title} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                    <ImageWithFallback
                      src={section.image}
                      alt={section.imageAlt}
                      className="w-full h-64 md:h-72 object-cover rounded-lg"
                    />
                  </div>

                  <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                    <h2 className="text-2xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>
                      {section.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.text}</p>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
