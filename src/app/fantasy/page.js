"use client";

import html2canvas from "html2canvas";
import { useState, useMemo } from "react";
import Select from "react-select";
import fantasyData from "../../../data/fantasy.json";
import playersData from "../../../data/players.json";

/**
 * Fantasy Leaderboard page – retains the printable template layout
 * while adding controls for Weekly/Overall results, top‑3 placements,
 * and an MVP. Everything the user selects is rendered inside the
 * `.template` block so the "Print Image" button still captures the
 * final graphic in one click.
 */
const FantasyLeaderboard = () => {
  /* -------------------------------- state -------------------------------- */
  const [view, setView] = useState("weekly");
  const [week, setWeek] = useState("");

  const placementsInit = [
    { place: "1st", team: null, points: "" },
    { place: "2nd", team: null, points: "" },
    { place: "3rd", team: null, points: "" },
  ];
  const [placements, setPlacements] = useState(placementsInit);
  const [mvp, setMvp] = useState({ player: null, points: "" });

  /* ---------------------------- option builders --------------------------- */
  const teamOptions = useMemo(
    () => fantasyData.map((t) => ({ value: t.name, label: t.name })),
    []
  );
  const playerOptions = useMemo(
    () => playersData.map((p) => ({ value: p.name, label: p.name })),
    []
  );

  /* ---------------------------- helper methods --------------------------- */
  const handlePlacementChange = (index, field, value) => {
    setPlacements((prev) => {
      const arr = [...prev];
      arr[index] = { ...arr[index], [field]: value };
      return arr;
    });
  };

  const handlePrintImage = () => {
    const templateDiv = document.querySelector(".template");

    html2canvas(templateDiv).then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "fantasy_leaderboard.png";
      link.href = image;
      link.click();
    });
  };


  /* ------------------------------ renderers ------------------------------ */
  const leaderboardHeading =
    view === "weekly"
      ? week
        ? `Week ${week} Leaderboard`
        : "Weekly Leaderboard"
      : "Overall Leaderboard";

  return (
    <main className="brewood">
      <div className="container">
        <div className="content">
          {/* --------------------------- control panel --------------------------- */}
          <div className="form space-y-6">
            {/* View selector */}
            <div className="flex gap-4">
              {["weekly", "overall"].map((id) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={`px-4 py-2 rounded-xl shadow transition hover:scale-[1.03] ${
                    view === id ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>

            {/* Week number input */}
            {view === "weekly" && (
              <div className="w-32">
                <label htmlFor="week" className="text-sm font-medium">
                  Week #
                </label>
                <input
                  id="week"
                  type="number"
                  min={1}
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="e.g. 6"
                />
              </div>
            )}

            {/* Top‑3 placements */}
            <section className="grid md:grid-cols-3 gap-6">
              {placements.map((pl, i) => (
                <div key={pl.place} className="space-y-2 border p-4 rounded-2xl shadow">
                  <h3 className="font-medium">{pl.place}</h3>
                  <Select
                    options={teamOptions}
                    value={teamOptions.find((o) => o.value === pl.team) || null}
                    onChange={(opt) => handlePlacementChange(i, "team", opt?.value || null)}
                    placeholder="Select team"
                    className="text-sm"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="Points"
                    value={pl.points}
                    onChange={(e) => handlePlacementChange(i, "points", e.target.value)}
                    className="border rounded p-2 w-full text-sm"
                  />
                </div>
              ))}
            </section>

            {/* MVP */}
            <section className="space-y-2 border p-4 rounded-2xl shadow max-w-md">
              <h3 className="font-medium">MVP</h3>
              <Select
                options={playerOptions}
                value={playerOptions.find((o) => o.value === mvp.player) || null}
                onChange={(opt) => setMvp({ ...mvp, player: opt?.value || null })}
                placeholder="Select player"
                className="text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Points"
                value={mvp.points}
                onChange={(e) => setMvp({ ...mvp, points: e.target.value })}
                className="border rounded p-2 w-full text-sm"
              />
            </section>

            {/* Template tools */}
            <div className="flex gap-4">
              <button className="form__print" onClick={handlePrintImage}>
                Print Image
              </button>
            </div>
          </div>

          {/* --------------------------- printable card -------------------------- */}
          <div className="template">
            {/* Background image */}
            <div className="template__background">
              <img src="./background/Background.png" alt="background" />
            </div>

            <div className="template__content">
              {/* Logo */}
              <div className="template__logo">
                <img src="./logo.png" alt="logo" />
              </div>

              {/* Heading */}
              <div className="template__result text-3xl font-bold mb-4">
                Fantasy League
              </div>
              <div className="template__result template__result-sub font-bold mb-4">
                {leaderboardHeading}
              </div>

              {/* Leaderboard list */}
              <div className="fantasy__leaderboard">
                <ul>
                  {placements
                    .filter((pl) => pl.team && pl.points)
                    .map((pl, idx) => (
                      <li
                        key={pl.place}
                        className={`fantasy-place fantasy-place--${idx + 1}`}
                      >
                        <span className="fantasy-place__rank">{pl.place}</span>
           
                        <span className="fantasy-team">{pl.team}</span>
                        <span className="fantasy-team">{pl.points} <span className="fantasy-small">pts</span></span>
                     
                      </li>
                    ))}
                </ul>
              </div>
              

              {/* MVP display */}
              {mvp.player && mvp.points && (
                <div className="fantasy__mvp">
                  <span className="fantasy__mvp-title">MVP</span>
                  <span className="fantasy__mvp-player">
                  {mvp.player}
                  </span>
                  <span className="fantasy__mvp-points">
                    {mvp.points} <span className="fantasy-small">pts</span>
                  </span>
                </div>
              )}

              {/* Socials (unchanged) */}
              <div className="template__socials">
                <ul>
                  <li>
                    {/* X */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        fill="#9B9BAA"
                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                      />
                    </svg>
                    <span>BREWOODCRICKET</span>
                  </li>
                  <li>
                    {/* Facebook */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        fill="#9B9BAA"
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                      />
                    </svg>
                    <span>BREWOODCRICKETCLUB</span>
                  </li>
                  <li>
                    {/* Instagram */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        fill="#9B9BAA"
                        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                      />
                    </svg>
                    <span>BREWOOD-CRICKET-CLUB</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FantasyLeaderboard;
