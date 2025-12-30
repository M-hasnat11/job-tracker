import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { jobs } from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Server action
async function addJob(formData: FormData) {
  'use server';
  const company = formData.get('company') as string;
  const title = formData.get('title') as string;
  await db.insert(jobs).values({
    id: crypto.randomUUID(),
    company,
    title,
    status: 'applied',
  });
}

export default async function Home() {
  const allJobs = await db.select().from(jobs);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <h1 className="text-6xl font-bold">Job Tracker</h1>
      
      <form action={addJob} className="flex gap-4">
        <input name="company" placeholder="Company" className="border p-2" />
        <input name="title" placeholder="Job Title" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      <ul className="w-full max-w-md">
        {allJobs.map(job => (
          <li key={job.id} className="border-b py-2">
            {job.company} - {job.title} ({job.status})
          </li>
        ))}
      </ul>
    </main>
  );
}