import { useState, useRef, useEffect } from 'react';

const MED_SUGGESTIONS = [
  'Albuterol', 'Allopurinol', 'Amlodipine', 'Amiodarone', 'Amoxicillin',
  'Antacid', 'Aspirin', 'Atenolol', 'Atorvastatin', 'Azithromycin',
  'Bisoprolol', 'Carbamazepine', 'Citalopram', 'Ciprofloxacin', 'Clarithromycin',
  'Clopidogrel', 'Codeine', 'Cyclosporine', 'Diazepam', 'Digoxin',
  'Doxycycline', 'Erythromycin', 'Fluconazole', 'Fluoxetine', 'Furosemide',
  'Gentamicin', 'Glipizide', 'Ibuprofen', 'Insulin', 'Isotretinoin',
  'Lansoprazole', 'Lisinopril', 'Lithium', 'Losartan', 'Metformin',
  'Methotrexate', 'Metoprolol', 'Nitroglycerin', 'Omeprazole', 'Oral Contraceptive',
  'Pantoprazole', 'Paracetamol', 'Phenytoin', 'Potassium', 'Prednisolone',
  'Ramipril', 'Rosuvastatin', 'Sertraline', 'Sildenafil', 'Simvastatin',
  'Spironolactone', 'Theophylline', 'Tramadol', 'Verapamil', 'Warfarin',
];

const InputForm = ({ onSubmit }) => {
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [reason, setReason] = useState('');
  const [conditions, setConditions] = useState('');
  const [pregnant, setPregnant] = useState('Unknown');
  const [allergies, setAllergies] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredMeds = MED_SUGGESTIONS.filter((med) =>
    med.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMed = (med) => {
    setSelectedMeds((prev) =>
      prev.includes(med) ? prev.filter((m) => m !== med) : [...prev, med]
    );
    setError('');
  };

  const removeMed = (med) => {
    setSelectedMeds((prev) => prev.filter((m) => m !== med));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const condList = conditions.split(',').map((c) => c.trim()).filter(Boolean);
    const allergyList = allergies.split(',').map((a) => a.trim()).filter(Boolean);

    if (selectedMeds.length < 2) {
      setError('Select at least 2 medications');
      return;
    }
    if (!age || !gender) {
      setError('Age and gender are required');
      return;
    }

    setError('');

    onSubmit({
      medications: selectedMeds,
      age: parseInt(age, 10),
      gender,
      reason,
      conditions: condList,
      pregnant,
      allergies: allergyList,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/20 rounded-xl p-6 mb-4 shadow-inner relative space-y-4"
    >
      {/* Medication multi-select */}
      <label className="block text-lime-300 text-sm font-medium">
        💊 Select Medications (choose at least 2)
      </label>

      <div className="relative" ref={dropdownRef}>
        {/* Trigger box */}
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full min-h-[46px] px-4 py-2 rounded-md bg-white/10 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-lime-400 flex flex-wrap gap-2 items-center"
        >
          {selectedMeds.length === 0 ? (
            <span className="text-gray-400 text-sm">Click to select medications...</span>
          ) : (
            selectedMeds.map((med) => (
              <span
                key={med}
                className="flex items-center gap-1 bg-lime-400 text-black text-xs font-semibold px-2 py-1 rounded-full"
              >
                {med}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeMed(med); }}
                  className="ml-1 hover:text-red-700 font-bold leading-none"
                >
                  ×
                </button>
              </span>
            ))
          )}
          <span className="ml-auto text-gray-400 text-xs">{dropdownOpen ? '▲' : '▼'}</span>
        </div>

        {/* Dropdown list */}
        {dropdownOpen && (
          <div className="absolute z-20 w-full mt-1 bg-gray-900 border border-white/20 rounded-lg shadow-xl">
            {/* Search inside dropdown */}
            <div className="p-2 border-b border-white/10">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medication..."
                autoFocus
                className="w-full px-3 py-1.5 rounded-md bg-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-lime-400"
              />
            </div>
            <ul className="max-h-56 overflow-y-auto">
              {filteredMeds.length === 0 ? (
                <li className="px-4 py-3 text-gray-400 text-sm">No medications found</li>
              ) : (
                filteredMeds.map((med) => {
                  const isSelected = selectedMeds.includes(med);
                  return (
                    <li
                      key={med}
                      onClick={() => toggleMed(med)}
                      className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer text-sm transition
                        ${isSelected
                          ? 'bg-lime-500/20 text-lime-300'
                          : 'text-white hover:bg-white/10'
                        }`}
                    >
                      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'bg-lime-400 border-lime-400' : 'border-gray-500'}`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      {med}
                    </li>
                  );
                })
              )}
            </ul>
            <div className="p-2 border-t border-white/10 text-xs text-gray-400 text-right">
              {selectedMeds.length} selected
            </div>
          </div>
        )}
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/10 text-white"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 rounded-md bg-white/10 text-white"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Reason for taking medications (optional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white"
      />

      <input
        type="text"
        placeholder="Existing conditions (comma-separated)"
        value={conditions}
        onChange={(e) => setConditions(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white"
      />

      <select
        value={pregnant}
        onChange={(e) => setPregnant(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white"
      >
        <option value="Unknown">Pregnant/Lactating?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <input
        type="text"
        placeholder="Known allergies (comma-separated)"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full mt-2 bg-lime-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
      >
        Check Interactions
      </button>
    </form>
  );
};

export default InputForm;
