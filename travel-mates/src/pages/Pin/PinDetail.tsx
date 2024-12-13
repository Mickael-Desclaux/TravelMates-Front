import { Avatar, Button, Carousel, Rating, Tab, TabPanel, Tabs, TabsBody, TabsHeader, ThemeProvider, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import './PinDetail.css';
import { NavLink, useParams } from "react-router-dom";
import { GetPinById } from "../../api/Pin";
import { Pin } from "../../interfaces/Pin";

interface PinReview {
    user: {
        profile: {
            firstname: string;
            lastname: string;
            media: {
                url: string;
            };
        };
    };
    rating: number;
    comment: string;
    media: {
        url: string;
    };
}

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

export default function PinDetail() {

    const [pin, setPin] = useState<Pin>();
    const [images, setImages] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>("detail");
    const [averageRating, setAverageRating] = useState<number>(0)
    const [averageExactRating, setAverageExactRating] = useState<number>(0.0)
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async() => {
            if (id) {
                try {
                    const data = await GetPinById(parseInt(id));
                    setPin(data);
                } catch (error) {
                    throw new Error(error as string)
                }
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const images = [
            ...(pin?.pinMedias ?? []).map(media => media.media.url),
            ...(pin?.review ?? []).flatMap(review => review.media?.url ?? []),
        ].filter(image => image !== undefined);
    
        setImages(images);
    }, [pin]);

    useEffect(() => {
        setAverageRating((pin?.review?.length ?? 0) > 0 ? Math.floor((pin?.review?.reduce((sum, review) => sum + (review?.rating ?? 0), 0) || 0) / (pin?.review?.length ?? 0)) : 0);
        setAverageExactRating((pin?.review?.length ?? 0) > 0 ? ((pin?.review ?? []).reduce((sum, review) => sum + (review?.rating ?? 0), 0)) / (pin?.review?.length ?? 0) : 0);
    });

    const data = [
        {
            label: "Détail",
            value: "detail",
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pin?.title || "test"}</Typography>
                        <div>
                            {
                                pin?.pinActivities.map((activityObj: { activity: string }, index: number) => (
                                    <Avatar src={`/activity/${activityObj.activity.toLowerCase()}.svg`} key={index} alt={activityObj.activity} size="sm" className="ms-1"></Avatar>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-6">
                        <Avatar src={import.meta.env.VITE_API_BASE_URL + pin?.user.profile.media.url} alt={pin?.user.profile.firstname + ' ' + pin?.user.profile.lastname} />
                        <Typography variant="h3" className="text-md text-black ms-3">Créé par {pin?.user.profile.firstname + ' ' + pin?.user.profile.lastname}</Typography>
                    </div>
                    <div className="mt-4">
                        <Typography variant="paragraph" className="text-black">{pin?.description || "test"}</Typography>
                    </div>
                </>,
        },
        {
            label: "Avis",
            value: "review",
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pin?.title || "test"}</Typography>
                        <div className="flex flex-row items-center">
                            <p className="me-2">{parseFloat(averageExactRating.toFixed(2))}</p>
                            <Rating key={averageRating} value={averageRating} className="custom-rating" readonly />
                        </div>
                    </div>
                    <NavLink className="flex justify-end mt-2" to={`/pin-review/${pin?.id}`}>
                        <Button type="button" className="bg-green">Ajouter un avis</Button>
                    </NavLink>
                    {
                        pin?.review && pin.review.length > 0 ? pin.review.map((review: PinReview, index: number) => (
                            <div key={index} className="mb-4">
                                <div className="flex flex-row items-start">
                                    <Avatar
                                        src={import.meta.env.VITE_API_BASE_URL + review.user?.profile?.media?.url || "default-avatar.png"}
                                        alt={`${review.user?.profile?.firstname || "Utilisateur"} ${review.user?.profile?.lastname || ""}`}
                                    />
                                    <div className="ml-3">
                                        <Typography className="text-black">
                                            {`${review.user?.profile?.firstname || "Utilisateur"} ${review.user?.profile?.lastname || ""}`}
                                        </Typography>
                                        <Rating value={review.rating} readonly className="custom-rating" />
                                    </div>
                                </div>
                                <div>
                                    <Typography>{review.comment || "Pas de commentaire."}</Typography>
                                </div>
                            </div>
                        )) : (
                            <Typography variant="lead" className="text-black">Il n'y a pas encore d'avis sur ce marqueur</Typography>
                        )
                    }
                </>,
        },
    ];

    return (
        <>
            <div className="md:mt-32 md:grid md:place-content-center mb-32">
                <div className="md:w-[60vw]">
                    <ThemeProvider value={carouselTheme}>
                        <Carousel className="flex items-center max-h-[400px] mb-4 custom-carousel">
                            {images.map((image: string, index: number) => (
                                <img key={index} src={import.meta.env.VITE_API_BASE_URL + image} alt="Image" className="max-h-[400px] mx-auto" />
                            ))}
                        </Carousel>

                    </ThemeProvider>
                    <Tabs value="detail">
                        <TabsHeader className="bg-gray-100">
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setActiveTab(value)}
                                    className={`${activeTab === value ? "underline" : ""}`}>
                                    <div className="flex items-center gap-2 text-green font-title font-bold">
                                        {label}
                                    </div>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <div className="h-1/4 overflow-y-auto">
                                {data.map(({ value, desc }) => (
                                    <TabPanel key={value} value={value}>
                                        {desc}
                                    </TabPanel>
                                ))}
                            </div>
                        </TabsBody>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
