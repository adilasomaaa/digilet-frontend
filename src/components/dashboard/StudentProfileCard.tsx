import { Card, CardBody, CardHeader, Button, Avatar, Divider } from "@heroui/react";
import { User, Mail, MapPin, Calendar, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from "@/context/AuthContext";

const StudentProfileCard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const studentData = {
        fullname: user?.name || "Student Name",
        nim: user?.student?.nim || "",
        email: user?.email || "student@example.com",
        studyProgram: user?.student?.institution.name || "Teknik Informatika",
        classYear: user?.student?.classYear || "2021",
        phoneNumber: user?.student?.phoneNumber || "081234567890",
        address: user?.student?.address || "Jl. Contoh No. 123, Kota",
    };

    return (
        <Card className="border-none shadow-sm sticky top-4">
            <CardHeader className="border-b border-default-200">
                <h2 className="text-lg font-bold">Profil Mahasiswa</h2>
            </CardHeader>
            <CardBody className="gap-4 p-6">
                <div className="flex flex-col items-center mb-4">
                    <Avatar 
                        size="lg" 
                        name={studentData.fullname}
                        className="w-24 h-24 text-large mb-3"
                    />
                    <h3 className="text-lg font-semibold text-center">{studentData.fullname}</h3>
                    <p className="text-sm text-default-500">NIM: {studentData.nim}</p>
                </div>

                <Divider />

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <User size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Program Studi</p>
                            <p className="text-sm font-medium break-words">{studentData.studyProgram}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Angkatan</p>
                            <p className="text-sm font-medium">{studentData.classYear}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Email</p>
                            <p className="text-sm font-medium break-all">{studentData.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Telepon</p>
                            <p className="text-sm font-medium">{studentData.phoneNumber}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-default-400 mt-1" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-default-500">Alamat</p>
                            <p className="text-sm font-medium break-words">{studentData.address}</p>
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

export default StudentProfileCard;
