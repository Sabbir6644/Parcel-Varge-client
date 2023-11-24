import Banner from "./Banner";
import Features from "./Features";
import Statistics from "./Statistics";
import TopDeliveryMan from "./TopDeliveryMan";



const Home = () => {
     return (
          <div>
               <Banner />
               <div className="bg-red-50">
                    <Features/>
               </div>
               <div className="">
                    <Statistics/>
               </div>
               <div className="">
                    <TopDeliveryMan/>
               </div>
          </div>
     );
};

export default Home;