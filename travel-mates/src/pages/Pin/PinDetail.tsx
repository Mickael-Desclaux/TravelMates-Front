import { Avatar, Button, Carousel, Rating, Tab, TabPanel, Tabs, TabsBody, TabsHeader, ThemeProvider, Typography } from "@material-tailwind/react";
import { Activity } from "../../interfaces/TripProps/TripProps";
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';
import { useEffect, useMemo, useState } from "react";
import './PinDetail.css';
import { NavLink } from "react-router-dom";

interface PinInfos {
    title: string;
    description: string;
    activities: Activity[];
    owner_firstname: string;
    owner_lastname: string;
    owner_profile_picture: string;
    pin_image: string[];
}

interface PinReview {
    user_firstname: string;
    user_lastname: string;
    user_profile_picture: string;
    rating: number;
    comment: string;
    pin_image?: string[];
}

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

export default function PinDetail() {

    // Fake Pin infos data
    const pinInfoData: PinInfos = useMemo(() => ({
        title: "Tour Eiffel",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. 
        Curabitur non nulla tellus. Nulla facilisi. Aenean suscipit odio elit, et rutrum nisi rutrum et. Nullam nec convallis justo. 
        Mauris et laoreet turpis. In maximus rutrum magna non mattis. Integer venenatis gravida ex, quis faucibus massa congue ut. 
        Proin placerat semper hendrerit. Ut id massa mauris.`,
        activities: [
            { id: 1, type: 'Museum', icon: cultureIcon },
            { id: 2, type: 'Adventure', icon: adventureIcon },
            { id: 3, type: 'Détente', icon: relaxationIcon },
            { id: 5, type: 'Fête', icon: partyIcon },
            { id: 4, type: 'Sport', icon: sportIcon }],
        owner_firstname: "Émilie",
        owner_lastname: "Deparis",
        owner_profile_picture: "https://docs.material-tailwind.com/img/face-2.jpg",
        pin_image: ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"],
    }), []);

    const pinReviews: PinReview[] = useMemo(() => [
        {
            user_firstname: "Michel",
            user_lastname: "Dupoitou",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-1.jpg",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. Curabitur non nulla tellus.",
            pin_image: ["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            ],
        },        {
            user_firstname: "Michel",
            user_lastname: "Dupoitou",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-1.jpg",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. Curabitur non nulla tellus.",
            pin_image: ["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            ],
        },        {
            user_firstname: "Michel",
            user_lastname: "Dupoitou",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-1.jpg",
            rating: 5,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. Curabitur non nulla tellus.",
            pin_image: ["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            ],
        },
        {
            user_firstname: "Patrick",
            user_lastname: "Decharente",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-4.jpg",
            rating: 2,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. Curabitur non nulla tellus.",
            pin_image: ["https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
                "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            ],
        },
        {
            user_firstname: "Éloïse",
            user_lastname: "Debordeaux",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
            rating: 1,
            comment: "",
            pin_image: [],
        },
    ], []);

    const [images, setImages] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>("detail");
    const [averageRating, setAverageRating] = useState<number>(0)
    const [averageExactRating, setAverageExactRating] = useState<number>(0.0)

    useEffect(() => {
        const images = [
            ...pinInfoData.pin_image,
            ...pinReviews.flatMap(review => review.pin_image ?? []),
        ].filter(image => image !== undefined);
        setImages(images);
    }, [pinInfoData, pinReviews]);

    useEffect(() => {
        setAverageRating(pinReviews.length > 0 ? Math.floor(pinReviews.reduce((sum, review) => sum + review.rating, 0) / pinReviews.length) : 0);
        setAverageExactRating(pinReviews.length > 0 ? (pinReviews.reduce((sum, review) => sum + review.rating, 0) / pinReviews.length) : 0)
    }, [pinReviews])

    const data = [
        {
            label: "Détail",
            value: "detail",
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pinInfoData.title}</Typography>
                        <div>
                            {
                                pinInfoData.activities.map((activity: Activity, index: number) => (
                                    <Avatar src={activity.icon} key={index} alt={activity.type} size="sm" className="ms-1"></Avatar>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-6">
                        <Avatar src={pinInfoData.owner_profile_picture} alt={pinInfoData.owner_firstname + ' ' + pinInfoData.owner_lastname} />
                        <Typography variant="h3" className="text-md text-black ms-3">Créé par {pinInfoData.owner_firstname + ' ' + pinInfoData.owner_lastname}</Typography>
                    </div>
                    <div className="mt-4">
                        <Typography variant="paragraph" className="text-black">{pinInfoData.description}</Typography>
                    </div>
                </>,
        },
        {
            label: "Avis",
            value: "review",
            header:
            <>                     

            </>,
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pinInfoData.title}</Typography>
                        <div className="flex flex-row items-center">
                            <p className="me-2">{parseFloat(averageExactRating.toFixed(2))}</p>
                            <Rating key={averageRating} value={averageRating} className="custom-rating" readonly />
                        </div>
                    </div>
                    <NavLink className="flex justify-end mt-2" to={"/pin/:id/add-review/"}>
                        <Button type="button" className="bg-green">Ajouter un avis</Button>
                    </NavLink>
                    {
                        pinReviews ? pinReviews.map((review: PinReview, index: number) => (
                            <div key={index} className="mb-4">
                                <div className="flex flex-row items-start">
                                    <Avatar src={review.user_profile_picture} alt={review.user_firstname + ' ' + review.user_lastname} />
                                    <div className="ml-3">
                                        <Typography className="text-black">{review.user_firstname + ' ' + review.user_lastname}</Typography>
                                        <Rating value={review.rating} readonly className="custom-rating" />
                                    </div>
                                </div>
                                <div>
                                    <Typography>{review.comment}</Typography>
                                </div>
                            </div>
                        )) : <Typography variant="lead" className="text-black">Il n'y a pas encore d'avis sur ce marqueur</Typography>
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
                                <img key={index} src={image} alt="Image" className="max-h-[400px] mx-auto" />
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
