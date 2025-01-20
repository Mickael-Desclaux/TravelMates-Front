import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileActivity from "../../components/Profile/ProfileActivity";

export default function Profile() {

  return (
    <>
      <div className="mb-32">
          <ProfileHeader />
          <ProfileActivity />
      </div>
    </>
  )
}