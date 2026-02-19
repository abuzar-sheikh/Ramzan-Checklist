import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Checklist = () => {
  const [isEnglish, setIsEnglish] = useState(true); // Default language is English

  const tasksEnglish = [
    "Have I prayed Tahajjud today?",
    "Have I recited the Holy Qur'an today?",
    "Have I offered 5 times prayer today?",
    "Have I offered my Nafl prayers today?",
    "Have I helped someone in need today?",
    "Have I reflected on the Qur'an today?",
    "Have I avoided backbiting today?",
    "Have I made any new intention for good deeds today?",
    "Have I sought forgiveness from Allah today?",
    "Have I done something beneficial for my family today?",
    "Have I fasted today?",
    "Have I avoided sins today?",
    "Have I recited today's adhkaar?",
    "Have I given charity today?",
    "Have I remembered death today?",
    "Have I reflected on the afterlife today?",
    "Have I lowered my gaze today?",
    "Have I spoken kind words today?",
    "Have I helped someone who asked for help today?",
    "Have I made someone smile today?",
  ];

  const tasksUrdu = [
    "کیا آج میں نے تہجد ادا کی؟",
    "کیا آج میں نے قرآن پاک کی تلاوت کی؟",
    "کیا آج میں نے پانچوں وقت کی نماز ادا کی؟",
    "کیا آج میں نے نفل نماز ادا کی؟",
    "کیا آج میں نے کسی کی مدد کی؟",
    "کیا آج میں نے قرآن مجید پر غور و تدبر کیا؟",
    "کیا آج میں نے غیبت سے خود کو بچایا؟",
    "کیا آج میں نے کسی نیک عمل کا ارادہ کیا؟",
    "کیا آج میں نے اللہ سبحانہ وتعالیٰ سے مغفرت طلب کی؟",
    "کیا آج میں نے اپنے گھر والوں کے لیے کوئی فائدہ بخش کام کیا؟",
    "کیا آج میں نے روزہ رکھا؟",
    "کیا آج میں نے گناہوں سے بچنے کی کوشش کی؟",
    "کیا آج میں نے کوئی تسبیح پڑھی؟ (یا آج کے دن کے اذکار پڑھے)",
    "کیا آج میں نے صدقہ دیا؟",
    "کیا آج میں نے موت کو یاد کیا؟",
    "کیا آج میں نے اپنی آخرت کے لیے غور و فکر کیا؟",
    "کیا آج میں نے اپنی نظریں نیچی رکھیں؟",
    "کیا آج میں نے سب کے ساتھ خوش اخلاقی سے بات کی؟",
    "کیا آج میں نے کسی کی مدد کی؟",
    "کیا آج میری وجہ سے کسی کے چہرے پر مسکراہٹ آئی؟",
  ];

  const tasks = isEnglish ? tasksEnglish : tasksUrdu;

  // Local storage and checklist management — validate stored shape
  const stored = JSON.parse(localStorage.getItem("checklist"));
  const initialChecklist =
    stored && Array.isArray(stored) && stored.length === tasks.length
      ? stored
      : tasks.map(() => Array(30).fill(null));

  const [checklist, setChecklist] = useState(initialChecklist);
  const [pendingUpdate, setPendingUpdate] = useState({
    taskIndex: null,
    dayIndex: null,
  });

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checklist));
  }, [checklist]);

  // Handle task selection
  const handleSelection = (taskIndex, dayIndex, value) => {
    const newChecklist = [...checklist];
    newChecklist[taskIndex][dayIndex] = value;
    setChecklist(newChecklist);
    setPendingUpdate({ taskIndex: null, dayIndex: null });
  };

  const confirmSelection = (taskIndex, dayIndex) => {
    setPendingUpdate({ taskIndex, dayIndex });
  };

  // Download the PDF
  const downloadPDF = () => {
    const input = document.getElementById("checklist-table");

    // Temporarily force a large layout for PDF generation (4 columns)
    const originalClasses = input.className; // Save the original class
    input.className = "grid grid-cols-4 gap-4"; // Force large screen layout for PDF

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size portrait
      const imgWidth = 190; // A4 page width in mm (minus margins)
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight); // Add the first page
      heightLeft -= pageHeight;

      // Add more pages if the content is taller than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Update position
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("RamzanChecklist by Sumzar.pdf");

      // Restore the original layout after PDF generation
      input.className = originalClasses; // Restore original class
    });
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish); // Toggle between English and Urdu
  };

  return (
    <div className="px-4 ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-slate-700">The Right Path</h5>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEnglish ? "Daily Tasks in Ramadan" : "رمضان چیک لسٹ"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
            <span>Yes</span>
            <span className="h-3 w-3 rounded-full bg-red-500 inline-block ml-3" />
            <span>No</span>
          </div>

          <button
            onClick={downloadPDF}
            className="bg-teal-600 text-white px-4 py-2 rounded shadow hover:brightness-110 transition"
          >
            {isEnglish ? "Download" : "ڈاؤن لوڈ"}
          </button>

          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="bg-slate-100 px-3 py-2 rounded text-sm hover:bg-slate-200 transition"
            aria-pressed={!isEnglish}
          >
            {isEnglish ? "اردو" : "English"}
          </button>
        </div>
      </div>

      {/* Checklist */}
      <div
        id="checklist-table"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="card-elevated border border-slate-100 rounded-xl p-5 flex flex-col justify-between min-h-[300px] hover:shadow-lg transition"
          >
            <h2
              className={`font-bold text-lg mb-2 ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {task}
            </h2>
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 30 }, (_, dayIndex) => (
                <div key={dayIndex} className="relative">
                  <button
                    aria-label={`Day ${dayIndex + 1}`}
                    className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-shadow duration-150 ${
                      checklist[taskIndex][dayIndex] === "yes"
                        ? "bg-green-500 text-white font-medium shadow-lg"
                        : checklist[taskIndex][dayIndex] === "no"
                        ? "bg-red-500 text-white font-medium shadow-lg"
                        : "bg-gray-200 text-slate-700 hover:shadow-sm"
                    }`}
                    onClick={() => confirmSelection(taskIndex, dayIndex)}
                  >
                    {dayIndex + 1}
                  </button>

                  {pendingUpdate.taskIndex === taskIndex &&
                    pendingUpdate.dayIndex === dayIndex && (
                      <div className="absolute z-20 bg-white border rounded-lg w-[120px] shadow-md mt-2 left-1/2 transform -translate-x-1/2">
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "yes")
                          }
                          className="block px-4 py-2 text-green-600 hover:bg-green-50 w-full text-center"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "no")
                          }
                          className="block px-4 py-2 text-red-600 hover:bg-red-50 w-full text-center"
                        >
                          No
                        </button>
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, null)
                          }
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 w-full text-center"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
