import { Card, CardBody, CardHeader, Button, Avatar, Divider } from "@heroui/react";
import { Mail, Building2, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from "@/context/AuthContext";

const LecturerProfileCard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const lecturerData = {
        fullname: user?.official?.name || user?.name || "Lecturer Name",
        nip: user?.official?.nip || "-",
        email: user?.email || "lecturer@example.com",
        institution: user?.official?.institution?.name || "Institution Name",
        occupation: user?.official?.occupation || "Dosen",
    };

    return (
        <Card className="border-none shadow-sm sticky top-4">
            <CardHeader className="border-b border-default-200">
                <h2 className="text-lg font-bold">Profil Dosen</h2>
            </CardHeader>
            <CardBody className="gap-4 p-6">
                <div className="flex flex-col items-center mb-4">
                    <Avatar 
                        size="lg" 
                        name={lecturerData.fullname}
                        className="w-24 h-24 text-large mb-3"
                    />
                    <h3 className="text-lg font-semibold text-center">{lecturerData.fullname}</h3>
                    <p className="text-sm text-default-500">NIP: {lecturerData.nip}</p>
                </div>

                <Divider />

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <Briefcase size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Jabatan</p>
                            <p className="text-sm font-medium break-words">{lecturerData.occupation}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Building2 size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Institusi</p>
                            <p className="text-sm font-medium break-words">{lecturerData.institution}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Email</p>
                            <p className="text-sm font-medium break-all">{lecturerData.email}</p>
                        </div>
                    </div>
                </div>

                <Divider className="my-2" />

                <Button
                    color="primary"
                    variant="flat"
                    size="sm"
                    className="w-full"
                    onPress={() => navigate('/dashboard/profile')}
                >
                    Edit Profil
                </Button>
            </CardBody>
        </Card>
    );
};

export default LecturerProfileCard;
