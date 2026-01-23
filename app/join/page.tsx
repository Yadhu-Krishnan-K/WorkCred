// "use client";

// import { motion } from "framer-motion";

// export default function JoinPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      
//       <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

//         {/* Company Circle */}
//         <motion.div
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           className="
//             w-48 h-48 
//             sm:w-56 sm:h-56 
//             md:w-64 md:h-64 
//             rounded-full 
//             bg-gradient-to-br from-amber-500 to-orange-500
//             flex flex-col items-center justify-center 
//             text-white cursor-pointer shadow-xl
//           "
//         >
//           <span className="text-xl sm:text-2xl font-bold">Company</span>
//           <span className="text-xs sm:text-sm opacity-90 mt-2 text-center">
//             Hire • Review • Grow
//           </span>
//         </motion.div>

//         {/* Candidate Circle */}
//         <motion.div
//           whileHover={{ scale: 1.08 }}
//           whileTap={{ scale: 0.95 }}
//           className="
//             w-48 h-48 
//             sm:w-56 sm:h-56 
//             md:w-64 md:h-64 
//             rounded-full 
//             bg-gradient-to-br from-blue-500 to-indigo-500
//             flex flex-col items-center justify-center 
//             text-white cursor-pointer shadow-xl
//           "
//         >
//           <span className="text-xl sm:text-2xl font-bold">Candidate</span>
//           <span className="text-xs sm:text-sm opacity-90 mt-2 text-center">
//             Work • Get Rated • Earn
//           </span>
//         </motion.div>

//       </div>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function JoinPage() {
      const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      
      {/* Container */}
      <div className="text-center max-w-4xl w-full">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-900"
        >
          Join <span className="text-amber-500">WorkCred</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-gray-600"
        >
          Choose how you want to get started
        </motion.p>

        {/* Circles Section */}
        <div className="relative mt-14 flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center">

          {/* Glow Background */}
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
          </div>

          {/* Company Circle */}
          <motion.div
                      onClick={() => router.push("/register/company")}

            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-48 h-48 
              sm:w-56 sm:h-56 
              md:w-64 md:h-64 
              rounded-full 
              bg-gradient-to-br from-amber-500 to-orange-500
              flex flex-col items-center justify-center 
              text-white cursor-pointer shadow-xl
            "
          >
            <span className="text-xl sm:text-2xl font-bold">Company</span>
            <span className="text-xs sm:text-sm opacity-90 mt-2 text-center">
              Hire • Review • Grow
            </span>
          </motion.div>

          {/* Candidate Circle */}
          <motion.div
           onClick={() => router.push("/register/candidate")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-48 h-48 
              sm:w-56 sm:h-56 
              md:w-64 md:h-64 
              rounded-full 
              bg-gradient-to-br from-blue-500 to-indigo-500
              flex flex-col items-center justify-center 
              text-white cursor-pointer shadow-xl
            "
          >
            <span className="text-xl sm:text-2xl font-bold">Candidate</span>
            <span className="text-xs sm:text-sm opacity-90 mt-2 text-center">
              Work • Get Rated • Earn
            </span>
          </motion.div>

        </div>

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-sm text-gray-500"
        >
          You can change your role later from your profile settings
        </motion.p>

      </div>
    </div>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function JoinPage() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="text-center max-w-4xl w-full">

//         <h1 className="text-4xl font-extrabold text-gray-900">
//           Join <span className="text-amber-500">WorkCred</span>
//         </h1>

//         <p className="mt-3 text-gray-600">
//           Choose how you want to get started
//         </p>

//         <div className="mt-14 flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-center">

//           {/* Company */}
//           <motion.div
//             onClick={() => router.push("/register/company")}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64
//                        rounded-full bg-gradient-to-br from-amber-500 to-orange-500
//                        flex flex-col items-center justify-center text-white
//                        cursor-pointer shadow-xl"
//           >
//             <span className="text-xl sm:text-2xl font-bold">Company</span>
//             <span className="text-xs sm:text-sm mt-2 opacity-90">
//               Hire • Review • Grow
//             </span>
//           </motion.div>

//           {/* Candidate */}
//           <motion.div
//             onClick={() => router.push("/register/candidate")}
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64
//                        rounded-full bg-gradient-to-br from-blue-500 to-indigo-500
//                        flex flex-col items-center justify-center text-white
//                        cursor-pointer shadow-xl"
//           >
//             <span className="text-xl sm:text-2xl font-bold">Candidate</span>
//             <span className="text-xs sm:text-sm mt-2 opacity-90">
//               Work • Get Rated • Earn
//             </span>
//           </motion.div>

//         </div>

//         <p className="mt-10 text-sm text-gray-500">
//           You can change your role later from your profile
//         </p>
//       </div>
//     </div>
//   );
// }
