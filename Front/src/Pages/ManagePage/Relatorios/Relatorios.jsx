import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Newspaper, 
  FileText, 
  Award 
} from 'lucide-react';

// Dados mockados para seções adicionais
const mockAdditionalData = {
  projectTrends: [
    { month: 'Jan', projects: 10 },
    { month: 'Fev', projects: 15 },
    { month: 'Mar', projects: 22 },
    { month: 'Abr', projects: 35 },
    { month: 'Mai', projects: 42 },
  ],
  topPerformingAreas: [
    { 
      id: 1, 
      name: 'Computação', 
      projectCount: 15,
      description: 'Projetos inovadores em tecnologia'
    },
    { 
      id: 2, 
      name: 'Sustentabilidade', 
      projectCount: 12,
      description: 'Pesquisas ambientais'
    },
    { 
      id: 3, 
      name: 'Saúde', 
      projectCount: 10,
      description: 'Iniciativas em pesquisa médica'
    }
  ],
  recentAchievements: [
    {
      id: 1,
      title: 'Prêmio Inovação em TI',
      description: 'Projeto de inteligência artificial reconhecido nacionalmente',
      date: '2024-05-15'
    },
    {
      id: 2,
      title: 'Publicação em Revista Internacional',
      description: 'Artigo sobre sustentabilidade aceito em revista de alto impacto',
      date: '2024-04-22'
    },
    {
      id: 3,
      title: 'Desenvolvimento de Tecnologia Social',
      description: 'Projeto de inclusão digital para comunidades rurais',
      date: '2024-03-10'
    }
  ]
};

const Relatorios = () => {
  const api = import.meta.env.VITE_API_LINK;
  const [data, setData] = useState({
    totalProjects: 0,
    totalDiscentes: 0,
    totalDocentes: 0,
    totalNews: 0,
  });
  const [additionalData, setAdditionalData] = useState(mockAdditionalData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [
        projetosResponse, 
        discentesResponse, 
        docentesResponse, 
        noticiasResponse
      ] = await Promise.all([
        axios.get(`${api}/projetos`),
        axios.get(`${api}/discentes`),
        axios.get(`${api}/doscentes`),
        axios.get(`${api}/noticias`)
      ]);

      setData({
        totalProjects: projetosResponse.data.length,
        totalDiscentes: discentesResponse.data.length,
        totalDocentes: docentesResponse.data.length,
        totalNews: noticiasResponse.data.length,
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition`}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center mb-2">
        <Icon className={`mr-2 ${color}`} size={24} />
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
      <motion.p
        className="text-4xl font-bold text-green-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {value}
      </motion.p>
    </motion.div>
  );

  const AreaPerformanceCard = () => (
    <motion.div 
      className="bg-white rounded-lg shadow p-6 col-span-full lg:col-span-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Top Áreas de Pesquisa</h2>
      <div className="grid grid-cols-3 gap-4">
        {additionalData.topPerformingAreas.map((area) => (
          <div key={area.id} className="text-center">
            <div className="bg-blue-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <Award className="text-blue-600" size={32} />
            </div>
            <p className="font-semibold text-gray-700">{area.name}</p>
            <p className="text-sm text-gray-500">{area.projectCount} Projetos</p>
            <p className="text-xs text-gray-400 mt-1">{area.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const ProjectTrendsChart = () => (
    <motion.div 
      className="bg-white rounded-lg shadow p-6 col-span-full lg:col-span-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tendências de Projetos</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={additionalData.projectTrends}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="projects" 
            stroke="#8884d8" 
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  const RecentAchievementsCard = () => (
    <motion.div 
      className="bg-white rounded-lg shadow p-6 col-span-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Conquistas Recentes</h2>
      {additionalData.recentAchievements.map((achievement) => (
        <div 
          key={achievement.id} 
          className="border-b last:border-b-0 py-3 flex items-center"
        >
          <FileText className="mr-3 text-green-600" size={24} />
          <div>
            <p className="font-semibold text-gray-800">{achievement.title}</p>
            <p className="text-sm text-gray-500">{achievement.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Data: {new Date(achievement.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="spinner w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-8 text-gray-800 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Painel de Relatórios
      </motion.h1>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <StatCard 
          icon={TrendingUp} 
          title="Total de Projetos" 
          value={data.totalProjects} 
          color="text-blue-600" 
        />
        <StatCard 
          icon={Users} 
          title="Total de Discentes" 
          value={data.totalDiscentes} 
          color="text-green-600" 
        />
        <StatCard 
          icon={BookOpen} 
          title="Total de Docentes" 
          value={data.totalDocentes} 
          color="text-purple-600" 
        />
        <StatCard 
          icon={Newspaper} 
          title="Total de Notícias" 
          value={data.totalNews} 
          color="text-red-600" 
        />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AreaPerformanceCard />
        <ProjectTrendsChart />
        <RecentAchievementsCard />
      </motion.div>
    </div>
  );
};

export default Relatorios;