<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProgressionFasciculeRepository")
 */
class ProgressionFascicule
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity = "User", inversedBy="utilisateurFascicule")
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity = "Fascicule", inversedBy="fasciculeUtilisateur")
     */
    private $fascicule;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * @param mixed $utilisateur
     */
    public function setUtilisateur($utilisateur): void
    {
        $this->utilisateur = $utilisateur;
    }

    /**
     * @return mixed
     */
    public function getFascicule()
    {
        return $this->fascicule;
    }

    /**
     * @param mixed $fascicule
     */
    public function setFascicule($fascicule): void
    {
        $this->fascicule = $fascicule;
    }


}
