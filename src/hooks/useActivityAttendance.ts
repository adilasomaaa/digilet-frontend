import { useState, useEffect, useCallback } from "react";
import { activityAttendanceService } from "@/services/ActivityAttendanceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activityAttendanceSchema } from "@/schemas/ActivityAttendanceSchema";
import { addToast } from "@heroui/react";

export const useActivityAttendance = (uniqueCode: string | undefined) => {
  const [activity, setActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radiusInfo, setRadiusInfo] = useState<{ isWithinRadius: boolean; distance: number; allowedRadius: number } | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(activityAttendanceSchema),
    defaultValues: {
      identifier: "",
    }
  });

  const fetchActivity = useCallback(async () => {
    if (!uniqueCode) return;
    setIsLoading(true);
    try {
      const res = await activityAttendanceService.getByCode(uniqueCode);
      setActivity(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [uniqueCode]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const handleValidateUser = async () => {
    const identifier = form.getValues("identifier");
    if (!identifier || !uniqueCode) return;

    setIsSubmitting(true);
    try {
      const res = await activityAttendanceService.validateParticipant(uniqueCode, identifier);
      setUserData(res.data.user);
      setStep(2);
    } catch (err: any) {
      addToast({
        title: "Gagal",
        description: err.message ?? "Terjadi kesalahan jaringan",
        color: "danger",
        closeIcon: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) return alert("Geolokasi tidak didukung");
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setLocation(coords);
        
        if (uniqueCode) {
            try {
                const res = await activityAttendanceService.checkLocation(uniqueCode, coords.latitude, coords.longitude);
                setRadiusInfo(res.data);
                if (res.data.isWithinRadius) {
                    setStep(3);
                }
            } catch (err) {
                console.error(err);
            }
        }
      },
      () => alert("Gagal mendapatkan lokasi"),
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async () => {
    if (!uniqueCode || !photo) return;
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("identifier", userData.identifier);
      formData.append("proofOfAttendance", photo);
      if (location) {
        formData.append("latitude", location.latitude.toString());
        formData.append("longitude", location.longitude.toString());
      }

      await activityAttendanceService.submitAttendance(uniqueCode, formData);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    activity, isLoading, isSubmitting,
    step, setStep, userData,
    location, handleGetLocation,
    radiusInfo,
    photo, setPhoto,
    isSuccessModalOpen, setIsSuccessModalOpen,
    form, handleValidateUser, handleSubmit
  };
};
