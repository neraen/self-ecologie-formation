<?php

namespace App\Repository;

use App\Entity\Fascicule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Fascicule|null find($id, $lockMode = null, $lockVersion = null)
 * @method Fascicule|null findOneBy(array $criteria, array $orderBy = null)
 * @method Fascicule[]    findAll()
 * @method Fascicule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FasciculeRepository extends ServiceEntityRepository
{

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fascicule::class);
    }

    public function getAllFasciculeByModuleName($module){
        return $this->createQueryBuilder('f')
            ->select('f, m')
            ->leftJoin('f.module_id', 'm')
            ->where("m.nom = '$module'")
            ->getQuery()
            ->getResult();
    }

    public function countFasciculeByModuleName($module){
        return $this->createQueryBuilder('f')
            ->select('count(f)')
            ->leftJoin('f.module_id', 'm')
            ->where("m.nom = '$module'")
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function countFasciculeByModuleID($moduleId){
        return $this->createQueryBuilder('f')
            ->select('count(f)')
            ->leftJoin('f.module_id', 'm')
            ->where("m.id = '$moduleId'")
            ->getQuery()
            ->getSingleScalarResult();
    }

//    /**
//     * @return Fascicule[] Returns an array of Fascicule objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Fascicule
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
