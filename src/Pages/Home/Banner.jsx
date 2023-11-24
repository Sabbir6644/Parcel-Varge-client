

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center md:bg-top h-96 md:h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-100"
        style={{
          backgroundImage: "url('https://i.ibb.co/N71GJGq/parcel-Banner3.png')",
          // https://i.ibb.co/1L1SfZm/Parcel-Banner.png
          // https://i.ibb.co/N71GJGq/parcel-Banner3.png
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>

      {/* Search Bar and Heading */}
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-4xl text-blue-700 max-w-2xl mx-auto md:text-6xl font-bold mb-4">Your Trusted Partner in Parcel Services</h2>
        <div className="flex mx-auto relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 border border-blue-500 rounded-md w-[80%] mx-auto   focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-[9px] px-4 rounded-r-md absolute left-[78%]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
