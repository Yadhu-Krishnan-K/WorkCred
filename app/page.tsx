


// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
//           WorkCred
//         </h1>

//         <div className="space-x-4">
//           <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black">
//             Login
//           </button>
//           <button className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded hover:bg-amber-600">
//             Register
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center px-10 py-16 gap-10">
          
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl font-bold leading-tight">
//               Discover the <span className="text-amber-500">Best Companies</span>,  
//               Trusted Employees & Freelancers
//             </h1>

//             <p className="mt-4 text-gray-600">
//               WorkCred is a trusted platform for company reviews, employee ratings,
//               and freelancing credibility — all in one place.
//             </p>

//             {/* ⭐ Rating Box */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               whileHover={{ scale: 1.03 }}
//               className="mt-6 mb-6 inline-flex items-center gap-4 px-5 py-3 rounded-xl 
//                          bg-white/80 backdrop-blur 
//                          shadow-md ring-1 ring-amber-200"
//             >
//               <div className="flex text-amber-500 text-xl">
//                 ★ ★ ★ ★ ★
//               </div>

//               <div className="flex flex-col leading-tight">
//                 <span className="text-sm font-semibold text-gray-800">
//                   5.0 Rating
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   Trusted by stars
//                 </span>
//               </div>
//             </motion.div>

//             {/* CTA */}
//             <button className="px-6 py-3 ml-6 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition">
//               Join WorkCred
//             </button>
//           </motion.div>

//           {/* Right Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex justify-center"
//           >
//             <Image
//               src="/hero.png"
//               alt="Career Growth"
//               width={500}
//               height={500}
//               className="rounded-lg"
//             />
//           </motion.div>

//         </div>
//       </div>

//       {/* Footer (ALWAYS at bottom) */}
//       <footer className="flex items-center justify-center px-6 py-4">
//         <p className="text-sm text-gray-500">
//           © 2026{" "}
//           <span className="font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
//             WorkCred
//           </span>
//           . All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }
  
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          WorkCred
        </h1>

        <div className="space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black">
            Login
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded hover:bg-amber-600">
            Register
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center px-10 py-16 gap-10">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold leading-tight">
              Discover the <span className="text-amber-500">Best Companies</span>,  
              Trusted Employees & Freelancers
            </h1>

            <p className="mt-4 text-gray-600">
              WorkCred is a trusted platform for company reviews, employee ratings,
              and freelancing credibility — all in one place.
            </p>

            {/* ⭐ Rating Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="mt-6 mb-6 inline-flex items-center gap-4 px-5 py-3 rounded-xl 
                         bg-white/80 backdrop-blur 
                         shadow-md ring-1 ring-amber-200"
            >
              <div className="flex text-amber-500 text-xl">
                ★ ★ ★ ★ ★
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-800">
                  5.0 Rating
                </span>
                <span className="text-xs text-gray-500">
                  Trusted by stars
                </span>
              </div>
            </motion.div>

            {/* CTA */}
            <button
              onClick={() => router.push("/join")}
              className="px-6 py-3 ml-6 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition"
            >
              Join WorkCred
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/hero.png"
              alt="Career Growth"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center px-6 py-4">
        <p className="text-sm text-gray-500">
          © 2026{" "}
          <span className="font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            WorkCred
          </span>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
