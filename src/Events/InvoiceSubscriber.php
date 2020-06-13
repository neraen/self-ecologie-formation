<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;


class InvoiceSubscriber implements EventSubscriberInterface{

    /**
     * @var Security
     */
    private $security;

    /**
     * @var InvoiceRepository
     */
    private $repository;

    public function  __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event){
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof Invoice && $method == "POST"){
            $chrono = $this->repository->findNextChrono($this->security->getUser());
            $result->setChrono($chrono);

            if(empty($result->getSentAt())){
                $result->setSentAt(new \DateTime());
            }
        }
    }

}