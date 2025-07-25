import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Users, 
  Trophy, 
  Calendar, 
  Edit3, 
  Trash2, 
  Eye,
  Plus,
  Target,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userTeams, setUserTeams] = useState([]);
  const [userStats, setUserStats] = useState({
    username: "Player123",
    joinDate: "2024-01-15",
    totalTeams: 12,
    favoriteFormation: "4-4-2 Diamond",
    avatar: "/api/placeholder/64/64"
  });

  // Mock user teams data
  useEffect(() => {
    const mockTeams = [
      {
        id: 1,
        name: "Lightning Strike",
        formation: "4-4-2 Diamond",
        keyPlayers: ["Endou Mamoru", "Gouenji Shuuya", "Kidou Yuuto"],
        createdDate: "2024-07-10",
        isPublic: true,
        likes: 45,
        description: "Aggressive attacking formation with strong midfield control"
      },
      {
        id: 2,
        name: "Defensive Wall",
        formation: "4-3-3",
        keyPlayers: ["Kazemaru Ichirouta", "Kabeyama Heigorou", "Tsunami Jousuke"],
        createdDate: "2024-07-08",
        isPublic: false,
        likes: 23,
        description: "Solid defensive setup with quick counter-attacks"
      },
      {
        id: 3,
        name: "Chaos Control",
        formation: "4-4-2 Diamond",
        keyPlayers: ["Fudou Akio", "Hiroto Kira", "Midorikawa Ryuuji"],
        createdDate: "2024-07-05",
        isPublic: true,
        likes: 67,
        description: "Unpredictable tactical approach with versatile players"
      }
    ];
    setUserTeams(mockTeams);
  }, []);

  const handleEditTeam = (teamId) => {
    navigate(`/team-builder?edit=${teamId}`);
  };

  const handleDeleteTeam = (teamId) => {
    setUserTeams(prev => prev.filter(team => team.id !== teamId));
  };

  const handleViewTeam = (teamId) => {
    navigate(`/team-details/${teamId}`);
  };

  const getFormationColor = (formation) => {
    switch (formation) {
      case '4-4-2 Diamond': return 'bg-orange-500';
      case '4-3-3': return 'bg-blue-500';
      case '3-5-2': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-orange-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Welcome back, manage your teams and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - User Profile */}
          <div className="lg:col-span-1">
            <Card className="bg-black/30 backdrop-blur-lg border-orange-400/20 text-white mb-6">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={userStats.avatar} alt={userStats.username} />
                  <AvatarFallback className="bg-orange-600 text-white text-xl">
                    {userStats.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-orange-400">{userStats.username}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Member Since:</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    <span className="text-sm">{new Date(userStats.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Teams:</span>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-400" />
                    <span className="text-sm">{userStats.totalTeams}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Favorite Formation:</span>
                  <Badge className={`${getFormationColor(userStats.favoriteFormation)} text-white`}>
                    {userStats.favoriteFormation}
                  </Badge>
                </div>
                
                <div className="pt-4 border-t border-orange-400/20">
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => navigate('/team-builder')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Team
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-black/30 backdrop-blur-lg border-orange-400/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Public Teams:</span>
                  <span className="text-orange-400">{userTeams.filter(t => t.isPublic).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Private Teams:</span>
                  <span className="text-orange-400">{userTeams.filter(t => !t.isPublic).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Likes:</span>
                  <span className="text-orange-400">{userTeams.reduce((sum, t) => sum + t.likes, 0)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Team Gallery */}
          <div className="lg:col-span-3">
            <Card className="bg-black/30 backdrop-blur-lg border-orange-400/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-400" />
                  My Teams ({userTeams.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userTeams.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4">No teams created yet</p>
                    <Button 
                      onClick={() => navigate('/team-builder')}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Team
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams.map((team) => (
                      <Card key={team.id} className="bg-orange-900/30 border-orange-400/30 hover:bg-orange-800/30 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-white">{team.name}</CardTitle>
                            <Badge 
                              variant={team.isPublic ? "default" : "secondary"}
                              className={team.isPublic ? "bg-green-600" : "bg-gray-600"}
                            >
                              {team.isPublic ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-orange-400" />
                            <Badge className={`${getFormationColor(team.formation)} text-white`}>
                              {team.formation}
                            </Badge>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-300 mb-2">Key Players:</p>
                            <div className="flex flex-wrap gap-1">
                              {team.keyPlayers.slice(0, 3).map((player, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-orange-400/50">
                                  {player}
                                </Badge>
                              ))}
                              {team.keyPlayers.length > 3 && (
                                <Badge variant="outline" className="text-xs border-orange-400/50">
                                  +{team.keyPlayers.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Created: {new Date(team.createdDate).toLocaleDateString()}
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            ❤️ {team.likes} likes
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 text-white border-orange-400/50 hover:bg-orange-700"
                              onClick={() => handleViewTeam(team.id)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 text-white border-orange-400/50 hover:bg-orange-700"
                              onClick={() => handleEditTeam(team.id)}
                            >
                              <Edit3 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-400 border-red-400/50 hover:bg-red-700"
                              onClick={() => handleDeleteTeam(team.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;