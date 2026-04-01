import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Footer from "@/components/home/Footer";
import { useAuth } from "@/hooks/useAuth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", user!.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          full_name: data.full_name || data.name || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          updatedAt: new Date(),
        },
        { merge: true } // keeps existing fields like role, email, etc.
      );
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/30">Account</Badge>
            <h1 className="text-4xl font-display font-bold">
              Your <span className="text-primary italic">Profile</span>
            </h1>
          </div>

          {/* Profile Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/80 to-primary relative">
              <div className="absolute -bottom-12 left-8">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl font-display font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-bold">
                    {profile.full_name || "Set your name"}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {user?.email}
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">Customer</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="Your address"
                  className="h-11"
                />
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={loading} className="gap-2 px-8">
                  <Save className="h-4 w-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export default Profile;
