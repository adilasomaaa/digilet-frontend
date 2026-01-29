import React, { useEffect } from "react";
import { Card, CardBody, Input, Button, Tabs, Tab, Divider, Spacer } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Save, Lock, User as UserIcon } from "lucide-react";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, changePasswordSchema } from "@/schemas/ProfileSchema";
import { useProfile } from "@/hooks/useProfile";

const ProfilePage = () => {
    const { user } = useAuth();
    const { updateProfile, changePassword, isLoading } = useProfile();
    
    // State for password visibility
    const [isVisibleCurrent, setIsVisibleCurrent] = React.useState(false);
    const [isVisibleNew, setIsVisibleNew] = React.useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

    // Profile Form
    const { control: profileControl, handleSubmit: handleProfileSubmit, reset: resetProfile, formState: { errors: profileErrors } } = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: "",
            email: "",
            occupation: ""
        }
    });

    // Password Form
    const { control: passwordControl, handleSubmit: handlePasswordSubmit, reset: resetPassword, formState: { errors: passwordErrors } } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    // Initialize profile form with user data
    useEffect(() => {
        if (user) {
            resetProfile({
                name: user.name || "",
                email: user.email || "",
                occupation: user.personnel?.position || "",
            });
        }
    }, [user, resetProfile]);

    const onProfileSubmit = async (data: any) => {
        await updateProfile(data);
    };

    const onPasswordSubmit = async (data: any) => {
        const success = await changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        });
        if (success) {
            resetPassword();
        }
    };

    const userRoleName = user?.userRoles?.name;
    const isPersonnel = userRoleName === "personnel";
    const isStudent = userRoleName === "student";

    return (
        <div className="max-w-4xl mx-auto p-4">
             <DashboardBreadcrumbs />
             <Spacer y={4} />
             <h1 className="text-2xl font-bold mb-6">Pengaturan Akun</h1>

            <Card className="w-full shadow-sm rounded-lg">
                <CardBody className="p-0">
                    <Tabs aria-label="Profile Options" color="primary" variant="underlined" classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-primary",
                        tab: "max-w-fit px-4 h-12",
                        tabContent: "group-data-[selected=true]:text-primary font-medium"
                    }}>
                        <Tab
                            key="profile"
                            title={
                                <div className="flex items-center space-x-2">
                                    <UserIcon size={18} />
                                    <span>Profil Saya</span>
                                </div>
                            }
                        >
                            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="flex flex-col gap-4 p-6">
                                {isStudent && (
                                    <>
                                        <Input
                                            label="NIM"
                                            value={user?.student?.nim || "-"}
                                            isReadOnly
                                            isDisabled
                                        />
                                        <Input
                                            label="Program Studi"
                                            value={user?.student?.institution?.name || "-"}
                                            isReadOnly
                                            isDisabled
                                        />
                                    </>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Controller
                                        name="name"
                                        control={profileControl}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Nama Lengkap"
                                                placeholder="Masukkan nama lengkap"
                                                isInvalid={!!profileErrors.name}
                                                errorMessage={profileErrors.name?.message as string}
                                                isReadOnly={isStudent} // Students cannot change name
                                                isDisabled={isStudent}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={profileControl}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Email"
                                                placeholder="Masukkan email"
                                                type="email"
                                                isInvalid={!!profileErrors.email}
                                                errorMessage={profileErrors.email?.message as string}
                                            />
                                        )}
                                    />
                                    {isPersonnel && (
                                        <Controller
                                            name="occupation"
                                            control={profileControl}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    label="Jabatan"
                                                    placeholder="Masukkan jabatan"
                                                    className="md:col-span-2"
                                                    isInvalid={!!profileErrors.occupation}
                                                    errorMessage={profileErrors.occupation?.message as string}
                                                />
                                            )}
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button color="primary" type="submit" isLoading={isLoading} startContent={<Save size={18} />}>
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab
                            key="security"
                            title={
                                <div className="flex items-center space-x-2">
                                    <Lock size={18} />
                                    <span>Keamanan</span>
                                </div>
                            }
                        >
                            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="flex flex-col gap-4 p-6 ">
                                <Controller
                                    name="currentPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Password Saat Ini"
                                            placeholder="Masukkan password saat ini"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={() => setIsVisibleCurrent(!isVisibleCurrent)}>
                                                    {isVisibleCurrent ? <EyeOff className="text-2xl text-default-400 pointer-events-none" /> : <Eye className="text-2xl text-default-400 pointer-events-none" />}
                                                </button>
                                            }
                                            type={isVisibleCurrent ? "text" : "password"}
                                            isInvalid={!!passwordErrors.currentPassword}
                                            errorMessage={passwordErrors.currentPassword?.message as string}
                                        />
                                    )}
                                />
                                
                                <Divider className="my-2" />
                                
                                <Controller
                                    name="newPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Password Baru"
                                            placeholder="Masukkan password baru"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={() => setIsVisibleNew(!isVisibleNew)}>
                                                    {isVisibleNew ? <EyeOff className="text-2xl text-default-400 pointer-events-none" /> : <Eye className="text-2xl text-default-400 pointer-events-none" />}
                                                </button>
                                            }
                                            type={isVisibleNew ? "text" : "password"}
                                            isInvalid={!!passwordErrors.newPassword}
                                            errorMessage={passwordErrors.newPassword?.message as string}
                                        />
                                    )}
                                />

                                <Controller
                                    name="confirmPassword"
                                    control={passwordControl}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Konfirmasi Password Baru"
                                            placeholder="Ulangi password baru"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}>
                                                    {isVisibleConfirm ? <EyeOff className="text-2xl text-default-400 pointer-events-none" /> : <Eye className="text-2xl text-default-400 pointer-events-none" />}
                                                </button>
                                            }
                                            type={isVisibleConfirm ? "text" : "password"}
                                            isInvalid={!!passwordErrors.confirmPassword}
                                            errorMessage={passwordErrors.confirmPassword?.message as string}
                                        />
                                    )}
                                />
                                
                                <div className="flex justify-end mt-4">
                                    <Button color="primary" type="submit" isLoading={isLoading} startContent={<Save size={18} />}>
                                        Ubah Password
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfilePage;
