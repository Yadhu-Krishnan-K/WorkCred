// lib/seedAdmin.ts
import bcrypt from "bcryptjs";
import { Admin } from "@/model/adminModel"; 

export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  try {
    const adminExists = await Admin.findOne({ email: adminEmail });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      await Admin.create({
        email: adminEmail,
        password: hashedPassword,
        role: "superadmin"
      });
      
      console.log("✅ Admin seeded successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  }
};