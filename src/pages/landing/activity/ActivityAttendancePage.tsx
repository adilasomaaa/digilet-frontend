import { useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  Card, CardBody, CardHeader, Button, 
  Chip, Skeleton, Alert, Input, Image,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@heroui/react";
import { 
  CheckCircle2, MapPin, Camera, User, 
  Search, ArrowRight, AlertTriangle 
} from "lucide-react";
import Logo from '@/assets/logo.png';
import { useActivityAttendance } from "@/hooks/useActivityAttendance";

const ActivityAttendancePage = () => {
    const { uniqueCode } = useParams<{ uniqueCode: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        activity, isLoading, isSubmitting,
        step, userData,
        location, handleGetLocation,
        radiusInfo,
        photo, setPhoto,
        isSuccessModalOpen, setIsSuccessModalOpen,
        form, handleValidateUser, handleSubmit
    } = useActivityAttendance(uniqueCode);

    if (isLoading) return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Skeleton className="h-96 w-full rounded-lg" />
        </div>
    );

    if (!activity) return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Alert color="danger" title="Kegiatan tidak ditemukan atau link tidak valid" />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="mb-6 flex justify-between items-center">
                <img src={Logo} width={100} className='my-4' alt="Logo" />
                <Chip color="primary" variant="flat">
                    Absensi Publik
                </Chip>
            </div>

            <Card className="mb-6">
                <CardHeader className="flex flex-col items-start px-6 pt-6">
                    <h2 className="text-xl font-bold">Absensi Kegiatan</h2>
                    <p className="text-default-500">{activity.activityName}</p>
                </CardHeader>
                <CardBody className="px-6 pb-6 gap-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-default-400">Tanggal</p>
                            <p className="font-medium">{new Date(activity.implementationDate).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div>
                            <p className="text-default-400">Lokasi</p>
                            <p className="font-medium">{activity.location || '-'}</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody className="p-6">
                    {/* Step 1: Input Identifier */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <Search size={40} className="mx-auto text-primary mb-2" />
                                <h3 className="text-lg font-semibold">Validasi Identitas</h3>
                                <p className="text-sm text-default-500">
                                    Silakan masukkan {activity.target === 'student' ? 'NIM' : 'NIP'} Anda untuk melanjutkan.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Input 
                                    {...form.register("identifier")}
                                    placeholder={activity.target === 'student' ? 'Masukkan NIM' : 'Masukkan NIP'}
                                    variant="bordered"
                                    isInvalid={!!form.formState.errors.identifier}
                                    errorMessage={form.formState.errors.identifier?.message as string}
                                />
                                <Button 
                                    color="primary" 
                                    onPress={handleValidateUser}
                                    isLoading={isSubmitting}
                                    endContent={<ArrowRight size={18} />}
                                >
                                    Cek
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: User Data & Location */}
                    {step === 2 && userData && (
                        <div className="space-y-6">
                            <Alert color="success" className="mb-4">
                                <div className="flex items-center gap-3">
                                    <User size={20} />
                                    <div>
                                        <p className="font-bold">{userData.name}</p>
                                        <p className="text-xs">{userData.identifier}</p>
                                    </div>
                                </div>
                            </Alert>
                            
                            <div className="text-center">
                                <MapPin size={40} className="mx-auto text-primary mb-2" />
                                <h3 className="text-lg font-semibold">Cek Lokasi</h3>
                                <p className="text-sm text-default-500">
                                    Pastikan Anda berada dalam radius 100 meter dari lokasi kegiatan.
                                </p>
                            </div>

                            <Button 
                                fullWidth 
                                color={location ? "success" : "primary"} 
                                variant={location ? "flat" : "solid"}
                                onPress={handleGetLocation}
                                startContent={<MapPin size={18} />}
                                isLoading={isSubmitting}
                            >
                                {location ? "Lokasi Terdeteksi" : "Dapatkan Lokasi"}
                            </Button>

                            {radiusInfo && !radiusInfo.isWithinRadius && (
                                <Alert 
                                    color="danger" 
                                    title="Di Luar Radius" 
                                    icon={<AlertTriangle />}
                                >
                                    Jarak Anda {radiusInfo.distance} meter dari lokasi. Minimal 100 meter.
                                </Alert>
                            )}
                        </div>
                    )}

                    {/* Step 3: Photo Upload */}
                    {step === 3 && (
                        <div className="space-y-6">
                             <Alert color="success">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={20} />
                                    <div>
                                        <p className="font-medium">Lokasi Terverifikasi!</p>
                                        <p className="text-xs">Identitas: {userData.name} ({userData.identifier})</p>
                                    </div>
                                </div>
                            </Alert>

                            <div className="text-center">
                                <Camera size={40} className="mx-auto text-primary mb-2" />
                                <h3 className="text-lg font-semibold">Bukti Kehadiran</h3>
                                <p className="text-sm text-default-500">Ambil foto Anda di lokasi sebagai bukti kehadiran.</p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    capture="environment" 
                                    className="hidden" 
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setPhoto(e.target.files[0]);
                                        }
                                    }}
                                />
                                {photo ? (
                                    <div className="relative w-full max-w-xs">
                                        <Image 
                                            src={URL.createObjectURL(photo)} 
                                            alt="Preview" 
                                            className="rounded-xl w-full"
                                        />
                                        <Button 
                                            size="sm" 
                                            color="danger" 
                                            className="absolute top-2 right-2 z-10"
                                            onPress={() => setPhoto(null)}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                ) : (
                                    <Button 
                                        variant="bordered" 
                                        color="primary" 
                                        className="h-32 w-full border-dashed"
                                        onPress={() => fileInputRef.current?.click()}
                                    >
                                        Ambil Foto
                                    </Button>
                                )}
                            </div>

                            <Button 
                                fullWidth 
                                color="primary" 
                                size="lg" 
                                isDisabled={!photo}
                                isLoading={isSubmitting}
                                onPress={handleSubmit}
                            >
                                Kirim Absensi
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>

            <Modal 
                isOpen={isSuccessModalOpen} 
                onOpenChange={setIsSuccessModalOpen}
                isDismissable={false}
                hideCloseButton
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 items-center pt-8">
                        <CheckCircle2 size={64} className="text-success mb-2" />
                        <h2 className="text-2xl font-bold">Absensi Berhasil!</h2>
                    </ModalHeader>
                    <ModalBody className="text-center pb-8">
                        <p className="text-default-600">
                            Terima kasih, data kehadiran Anda telah berhasil disimpan di sistem.
                        </p>
                    </ModalBody>
                    <ModalFooter className="flex justify-center pb-8">
                        <Button color="primary" onPress={() => navigate("/")}>
                            Selesai
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ActivityAttendancePage;

