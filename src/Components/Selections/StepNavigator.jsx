import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mx-auto mt-10 relative translate-y-16">
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          {currentStep > 1 && (
            <button onClick={handlePrevStep} className="text-gray-500 mr-5">
              <HiArrowLeft className="w-8 h-8" />
            </button>
          )}
          <div className="flex items-center space-x-5">
            {[1, 2].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  stepNumber === currentStep
                    ? "bg-secondaryColor text-white"
                    : stepNumber < currentStep
                    ? "bg-primaryColor text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
        </div>
        {currentStep < 3 && (
          <button
            onClick={handleNextStep}
            className="text-gray-500 ml-5 hover:text-gray-700 transition duration-300"
          >
            <HiArrowRight className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
