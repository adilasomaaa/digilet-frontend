import { env } from "@/lib/env";
import type { Announcement } from "@/models";
import { Alert, Button, Skeleton } from "@heroui/react"
import { Link } from "react-router";

interface AnnouncementProps {
    announcement: Announcement[];
    isLoading: boolean;
}

const AnnouncementCard = ({ announcement, isLoading }: AnnouncementProps) => {

    if(isLoading) return (
        <>
            <div className="flex items-center justify-center w-full">
                <Skeleton className="w-full h-12 rounded-lg" />
            </div>
        </>
    )

  return (
    <>
        <div className="flex items-center justify-center w-full">
            {announcement.length > 0 && (
                <div className="grid grid-cols-1  gap-6">
                    <h1 className="text-2xl font-semibold">Pengumuman</h1>
                    {announcement.map((announcement) => (
                        <Alert
                            color="warning"
                            description={
                                <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                            }
                            endContent={
                                announcement.file ? (
                                    <Button color="warning" size="sm" variant="flat" as={Link} to={`${env.apiBaseUrl}${announcement.file}`} target="_blank" rel="noopener noreferrer">
                                        Lihat File
                                    </Button>
                                ) : null
                            }
                            variant="faded"
                        />
                    ))}
                </div>
            )}
        </div>
    </>
  )
}

export default AnnouncementCard