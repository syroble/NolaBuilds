import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { 
  User, Mail, Phone, Lock, MapPin, Calendar, 
  DollarSign, FileText, ArrowRight, ArrowLeft,
  Upload, Home, Landmark, Check, SquareSquare, Image as ImageIcon
} from "lucide-react";

interface SignupFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const RENOVATION_INTEREST_OPTIONS = [
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Flooring & Tiling",
  "Painting & Wall Finishes",
  "Exterior Deck/Siding/Landscaping",
  "Custom Carpentry & Hardwood",
  "Full Home Restoration"
];

export default function SignupForm({ onSubmit, isLoading, errorMessage }: SignupFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      ownershipStatus: "Owner",
      yearBuilt: "",
      propertySize: "",
      image: "",
      renovationInterests: [] as string[],
      timeline: "1-3 Months",
      budgetRange: "45000",
      projectDescription: ""
    }
  });

  const selectedInterests = watch("renovationInterests") || [];
  const currentImage = watch("image");
  const [dragActive, setDragActive] = useState(false);

  const handleFormSubmit = (data: any) => {
    const parts = [
      data.address1,
      data.address2,
      data.city,
      data.state,
      data.zipCode
    ].filter(Boolean);
    const combinedAddress = parts.join(", ");
    onSubmit({
      ...data,
      address: combinedAddress
    });
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 1) {
      const isStep1Valid = await trigger(["firstName", "lastName", "email", "phone", "password"]);
      if (isStep1Valid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isStep2Valid = await trigger(["address1", "city", "state", "zipCode", "ownershipStatus"]);
      if (isStep2Valid) {
        setStep(3);
      }
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleInterestToggle = (interest: string) => {
    const current = [...selectedInterests];
    const idx = current.indexOf(interest);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(interest);
    }
    setValue("renovationInterests", current);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-left">
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/40 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-semibold leading-relaxed">
          {errorMessage}
        </div>
      )}

      {/* Stepper Header */}
      <div className="flex items-center justify-between px-1 py-1 mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-450"}`}>1</span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Account</span>
        </div>
        <div className="h-[2px] flex-1 mx-2 bg-slate-100 dark:bg-slate-800">
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 1 ? "w-0" : step === 2 ? "w-1/2" : "w-full"}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-450"}`}>2</span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Property</span>
        </div>
        <div className="h-[2px] flex-1 mx-2 bg-slate-100 dark:bg-slate-800">
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step <= 2 ? "w-0" : "w-full"}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 3 ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-450"}`}>3</span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Interests</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 pt-1">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/10 text-[11px] font-bold text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/30">
            Step 1: Account &amp; Contact Information
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative pl-1">
              <User className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
              <Input
                label="First Name"
                type="text"
                placeholder="Penelope"
                className="pl-10"
                error={errors.firstName?.message}
                {...register("firstName", { required: "First name is required" })}
              />
            </div>
            <div className="relative pl-1">
              <User className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
              <Input
                label="Last Name"
                type="text"
                placeholder="Cruz"
                className="pl-10"
                error={errors.lastName?.message}
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
          </div>

          <div className="relative pl-1">
            <Mail className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              className="pl-10"
              error={errors.email?.message}
              {...register("email", { 
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>

          <div className="relative pl-1">
            <Phone className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="504-555-0192"
              className="pl-10"
              error={errors.phone?.message}
              {...register("phone", { required: "Phone number is required" })}
            />
          </div>

          <div className="relative pl-1">
            <Lock className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
            <Input
              label="Workspace Password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              error={errors.password?.message}
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
          </div>

          <button
            onClick={handleNext}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <span>Continue to Property Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 pt-1">
          <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            Step 2: Property Specifications
          </div>

          <div className="relative pl-1">
            <MapPin className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
            <Input
              label="Address Line 1"
              type="text"
              placeholder="E.g., 818 Belmont Ave"
              className="pl-10"
              error={errors.address1?.message}
              {...register("address1", { required: "Address Line 1 is required" })}
            />
          </div>

          <div className="relative pl-1">
            <MapPin className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
            <Input
              label="Address Line 2 (Optional)"
              type="text"
              placeholder="Apt, Suite, Unit, etc."
              className="pl-10"
              error={errors.address2?.message}
              {...register("address2")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative pl-1">
              <Input
                label="City"
                type="text"
                placeholder="E.g., New Orleans"
                error={errors.city?.message}
                {...register("city", { required: "City is required" })}
              />
            </div>
            <div className="relative pl-1">
              <Input
                label="State"
                type="text"
                placeholder="LA"
                error={errors.state?.message}
                {...register("state", { required: "State is required" })}
              />
            </div>
            <div className="relative pl-1">
              <Input
                label="Zip Code"
                type="text"
                placeholder="70115"
                error={errors.zipCode?.message}
                {...register("zipCode", { required: "Zip code is required" })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left pl-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Ownership Status</span>
            </label>
            <select
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              {...register("ownershipStatus", { required: "Ownership status is required" })}
            >
              <option value="Owner">Primary Residence (Owner)</option>
              <option value="Rental Property">Rental Property / Landlord</option>
              <option value="Under Contract">Under Contract / Escrow</option>
              <option value="Prospective Buyer">Prospective Buyer / Researching</option>
            </select>
            {errors.ownershipStatus && (
              <span className="text-[10px] text-rose-500 font-semibold">{errors.ownershipStatus.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative pl-1">
              <Calendar className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
              <Input
                label="Year Built (Optional)"
                type="number"
                placeholder="E.g., 1890"
                className="pl-10"
                {...register("yearBuilt")}
              />
            </div>
            <div className="relative pl-1">
              <SquareSquare className="absolute top-10.5 left-4 w-4 h-4 text-slate-400" />
              <Input
                label="Property Size (sq ft - Optional)"
                type="number"
                placeholder="E.g., 2400"
                className="pl-10"
                {...register("propertySize")}
              />
            </div>
          </div>

          {/* Optional Image Upload Component */}
          <div className="pl-1 space-y-1.5 relative">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Property Photo (Optional)</span>
            </label>
            
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                dragActive 
                  ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/10" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700"
              }`}
            >
              {currentImage ? (
                <div className="flex items-center gap-3 justify-center">
                  <img 
                    src={currentImage} 
                    alt="Property Preview" 
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">Photo Attached</span>
                    <button 
                      type="button"
                      onClick={() => setValue("image", "")}
                      className="text-[9px] font-bold text-slate-400 hover:text-red-500 dark:hover:text-red-400 underline"
                    >
                      Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    Drag and drop your property image or <span className="text-blue-600 dark:text-blue-400">browse</span>
                  </p>
                  <p className="text-[9px] text-slate-400">PNG, JPG up to 5MB (Exterior home or floor plan)</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="property-image-signup"
                  />
                  <label htmlFor="property-image-signup" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-2 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              <span>Continue to Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 pt-1">
          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 text-[11px] font-bold text-amber-600 dark:text-amber-400 rounded-xl border border-amber-100 dark:border-amber-900/30">
            Step 3: Renovation Interests &amp; Goals
          </div>

          {/* Area of Interests checkboxes */}
          <div className="space-y-2 pl-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>What elements are you interested in renovating?</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {RENOVATION_INTEREST_OPTIONS.map(option => {
                const isSelected = selectedInterests.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInterestToggle(option)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-slate-300 border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 text-left pl-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Target Timeline</span>
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                {...register("timeline")}
              >
                <option value="Immediate (< 1 Month)">Immediate</option>
                <option value="1-3 Months">1-3 Months</option>
                <option value="3-6 Months">3-6 Months</option>
                <option value="6+ Months (Planning)">6+ Months</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 text-left pl-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                <span>Budget Tier</span>
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                {...register("budgetRange")}
              >
                <option value="15000">Thrifty ($10k - $20k)</option>
                <option value="45000">Intermediate ($35k - $60k)</option>
                <option value="85000">Premium ($75k - $100k)</option>
                <option value="150000">Luxury ($125k+)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left pl-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Project Goals &amp; Concepts</span>
            </label>
            <textarea
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm min-h-24 resize-none"
              placeholder="Tell us what you are building. E.g., 'Restore the double parlor hardwood oak floors and wrap exterior deck with cedar siding.'"
              {...register("projectDescription", { required: "Project description is required" })}
            />
            {errors.projectDescription && (
              <span className="text-[11px] font-semibold text-rose-500">{errors.projectDescription.message}</span>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <Button
              type="submit"
              className="flex-2 py-3 text-sm font-bold"
              loading={isLoading}
            >
              Activate Portal
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
