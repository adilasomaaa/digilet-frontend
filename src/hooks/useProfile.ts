import { useState } from "react";
import { authService } from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

export const useProfile = () => {
    const { refetchUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async (data: any) => {
        setIsLoading(true);
        try {
            await authService.updateProfile(data);
            if (refetchUser) await refetchUser();
            return true;
        } catch (error: any) {
            console.error(error);
            // http fetcher also handles error toast
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (data: any) => {
        setIsLoading(true);
        try {
            await authService.changePassword(data);
            return true;
        } catch (error: any) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateProfile,
        changePassword,
        isLoading
    };
};
