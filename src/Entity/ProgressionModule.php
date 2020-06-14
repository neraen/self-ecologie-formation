<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProgressionModuleRepository")
 */
class ProgressionModule
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity = "User", inversedBy="utilisateurModule")
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity = "Module", inversedBy="moduleUtilisateur")
     */
    private $module;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModuleId(): ?int
    {
        return $this->module_id;
    }

    public function setModuleId(int $module_id): self
    {
        $this->module_id = $module_id;

        return $this;
    }

    public function getUtilisateurId(): ?int
    {
        return $this->utilisateur_id;
    }

    public function setUtilisateurId(int $utilisateur_id): self
    {
        $this->utilisateur_id = $utilisateur_id;

        return $this;
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
    public function getModule()
    {
        return $this->module;
    }

    /**
     * @param mixed $module
     */
    public function setModule($module): void
    {
        $this->module = $module;
    }


}
