"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function RatingPage() {

  const { requestId } = useParams();

  const [type, setType] = useState("");

  const [communication, setCommunication] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [skills, setSkills] = useState(0);

  const [approach, setApproach] = useState(0);
  const [environment, setEnvironment] = useState(0);
  const [visibility, setVisibility] = useState(0);

  // ⭐ new review state
  const [review, setReview] = useState("");

  useEffect(() => {

    const load = async () => {
      const res = await fetch(`/api/rating/request/${requestId}`);
      const data = await res.json();
      setType(data.type);
    };

    load();

  }, [requestId]);

  const submitRating = async () => {

    await fetch("/api/rating/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        requestId,
        communication,
        performance,
        skills,
        approach,
        environment,
        visibility,
        review
      }),
    });

    alert("Rating submitted successfully");
  };

  const Star = ({ value, setValue }: any) => (

    <div className="flex gap-2 text-2xl cursor-pointer">
      {[1,2,3,4,5].map((star) => (
        <span key={star} onClick={() => setValue(star)}>
          {star <= value ? "⭐" : "☆"}
        </span>
      ))}
    </div>

  );

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-[420px] space-y-6">

        <h1 className="text-xl font-bold text-center">
          Submit Rating
        </h1>

        {type === "companyToUser" && (

          <>
            <div>
              <p className="font-semibold">Communication</p>
              <Star value={communication} setValue={setCommunication} />
            </div>

            <div>
              <p className="font-semibold">Performance</p>
              <Star value={performance} setValue={setPerformance} />
            </div>

            <div>
              <p className="font-semibold">Skills</p>
              <Star value={skills} setValue={setSkills} />
            </div>
          </>

        )}

        {type === "userToCompany" && (

          <>
            <div>
              <p className="font-semibold">Approach</p>
              <Star value={approach} setValue={setApproach} />
            </div>

            <div>
              <p className="font-semibold">Environment</p>
              <Star value={environment} setValue={setEnvironment} />
            </div>

            <div>
              <p className="font-semibold">Visibility</p>
              <Star value={visibility} setValue={setVisibility} />
            </div>
          </>

        )}

        {/* ⭐ Review Field */}
        <div>
          <p className="font-semibold">Review</p>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          onClick={submitRating}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Submit Rating
        </button>

      </div>

    </div>
  );
}